import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual } from 'typeorm';
import { Venta } from 'src/venta/venta.entity';
import { Producto } from 'src/inventario/producto.entity';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventasRepo: Repository<Venta>,
    @InjectRepository(Producto)
    private readonly productosRepo: Repository<Producto>,
  ) {}

  private getRangoPorPeriodo(periodo: string) {
    const ahora = new Date();
    let inicio: Date;

    switch (periodo) {
      case 'dia':
        inicio = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
        break;
      case 'semana':
        inicio = new Date(ahora);
        inicio.setDate(ahora.getDate() - 7);
        break;
      case 'mes':
        inicio = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
        break;
      case 'año':
        inicio = new Date(ahora.getFullYear(), 0, 1);
        break;
      default:
        inicio = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
    }

    return { inicio, fin: ahora };
  }

  async gananciasPorPeriodo(periodo: string) {
    const { inicio, fin } = this.getRangoPorPeriodo(periodo);

    const ventas = await this.ventasRepo.find({
      where: { fecha: Between(inicio, fin) },
      relations: ['detalles', 'detalles.producto'],
    });

    return this.calcularGanancias(ventas);
  }

  async gananciasPorRango(from: Date, to: Date) {
    const ventas = await this.ventasRepo.find({
      where: { fecha: Between(from, to) },
      relations: ['detalles', 'detalles.producto'],
    });

    return this.calcularGanancias(ventas);
  }

  private calcularGanancias(ventas: Venta[]) {
    let totalIngresos = 0;
    let totalCostos = 0;

    for (const venta of ventas) {
      for (const item of venta.detalles) {
        const ingreso = item.cantidad * item.precioUnitario;
        const costo = item.cantidad * item.producto.precioCompra;

        totalIngresos += ingreso;
        totalCostos += costo;
      }
    }

    return {
      totalIngresos,
      totalCostos,
      gananciaNeta: totalIngresos - totalCostos,
      margen: totalIngresos > 0 ? ((totalIngresos - totalCostos) / totalIngresos) * 100 : 0,
    };
  }
}
