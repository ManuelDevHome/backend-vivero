import { Controller, Get, Post, Put, Delete, Param, Body, BadRequestException } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CreateProductoDto } from 'src/dto/create-producto.dto';
import { UpdateProductoDto } from 'src/dto/update-producto.dto';

@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Post()
  async create(@Body() dto: CreateProductoDto) {
    if (dto.precioVenta < dto.precioCompra) {
      throw new BadRequestException('El precio de venta no puede ser menor al precio de compra');
    }
    return this.inventarioService.create(dto);
  }

  @Get()
  findAll() {
    return this.inventarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventarioService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProductoDto) {
    if (dto.precioVenta !== undefined && dto.precioCompra !== undefined) {
      if (dto.precioVenta < dto.precioCompra) {
        throw new BadRequestException('El precio de venta no puede ser menor al precio de compra');
      }
    }
    return this.inventarioService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventarioService.remove(+id);
  }
}
