import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Venta } from './venta.entity';
import { DetalleVenta } from './detalle-venta.entity';
import { Producto } from 'src/inventario/producto.entity';

interface ItemVenta {
  productoId: number;
  cantidad: number;
}

@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Venta) private ventaRepo: Repository<Venta>,
    @InjectRepository(DetalleVenta) private detalleRepo: Repository<DetalleVenta>,
    @InjectRepository(Producto) private productoRepo: Repository<Producto>,
    private dataSource: DataSource,
  ) {}

  async crearVenta(items: ItemVenta[]) {
    // Usamos una transacción para asegurar atomicidad
    return this.dataSource.transaction(async (manager) => {
      // Validar stock de todos los productos
      for (const item of items) {
        const producto = await manager.findOne(Producto, { where: { id: item.productoId } });
        if (!producto) {
          throw new BadRequestException(`Producto con id ${item.productoId} no existe`);
        }
        if (producto.stock < item.cantidad) {
          throw new BadRequestException(
            `Stock insuficiente para el producto "${producto.nombre}". Disponible: ${producto.stock}`,
          );
        }
      }

      // Crear la venta
      const venta = manager.create(Venta, {
        fecha: new Date(),
        total: 0, // luego lo calculamos
      });
      const ventaGuardada = await manager.save(venta);

      let total = 0;
      for (const item of items) {
        const producto = await manager.findOneOrFail(Producto, { where: { id: item.productoId } });

        // Descontar stock
        producto.stock -= item.cantidad;
        await manager.save(producto);

        // Calcular subtotal
        const subtotal = Number(producto.precioVenta) * item.cantidad;
        total += subtotal;

        // Crear detalle
        const detalle = manager.create(DetalleVenta, {
          venta: ventaGuardada,
          producto,
          cantidad: item.cantidad,
          precioUnitario: producto.precioVenta,
          subtotal,
        });
        await manager.save(detalle);
      }

      // Actualizar total de la venta
      ventaGuardada.total = total;
      await manager.save(ventaGuardada);

      return { mensaje: 'Venta creada con éxito', ventaId: ventaGuardada.id };
    });
  }

  async findAll() {
    return this.ventaRepo.find({ relations: ['detalles', 'detalles.producto'] });
  }

  async findOne(id: number) {
    return this.ventaRepo.findOne({
      where: { id },
      relations: ['detalles', 'detalles.producto'],
    });
  }
}
