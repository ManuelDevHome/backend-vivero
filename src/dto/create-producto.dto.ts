import { IsNotEmpty, IsString, IsInt, Min, IsNumber } from 'class-validator';

export class CreateProductoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsInt()
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock: number;

  @IsNumber()
  @Min(0, { message: 'El precio de compra no puede ser negativo' })
  precioCompra: number;

  @IsNumber()
  @Min(0, { message: 'El precio de venta no puede ser negativo' })
  precioVenta: number;
}
