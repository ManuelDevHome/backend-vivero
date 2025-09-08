import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Venta } from './venta.entity';
import { Producto } from 'src/inventario/producto.entity';// Ajusta ruta según donde tengas Producto

@Entity('detalles_venta')
export class DetalleVenta {
  @PrimaryGeneratedColumn()
  id: number;

  // Cantidad de ese producto vendido
  @Column('int')
  cantidad: number;

  // Precio de venta unitario al momento de la transacción
  @Column('decimal', { precision: 10, scale: 2 })
  precioUnitario: number;

  // Subtotal = cantidad * precioUnitario
  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  // Clave foránea a Venta
  @ManyToOne(() => Venta, (venta) => venta.detalles, { onDelete: 'CASCADE' })
  venta: Venta;

  // Clave foránea a Producto
  @ManyToOne(() => Producto, { eager: true })
  producto: Producto;
}
