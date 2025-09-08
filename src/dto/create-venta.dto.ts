// src/venta/dto/crear-venta.dto.ts
import { IsInt, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

class ItemVentaDto {
  @IsInt()
  productoId: number;

  @IsInt()
  @Min(1)
  cantidad: number;
}

export class CrearVentaDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemVentaDto)
  items: ItemVentaDto[];
}
