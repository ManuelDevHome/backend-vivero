import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['nombre'])
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('int')
  stock: number;

  @Column('decimal')
  precioCompra: number;

  @Column('decimal')
  precioVenta: number;
}
