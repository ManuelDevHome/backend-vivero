import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { DetalleVenta } from './detalle-venta.entity';

@Entity('ventas')
export class Venta {
  @PrimaryGeneratedColumn()
  id: number;

  // Fecha y hora exacta en que se registra la venta
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    fecha: Date;

  // Total de la venta (opcional si prefieres calcularlo sobre la marcha)
  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  // Relación con detalles
  @OneToMany(() => DetalleVenta, (detalle) => detalle.venta, { cascade: true })
  detalles: DetalleVenta[];
}
