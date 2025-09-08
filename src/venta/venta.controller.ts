import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VentaService } from './venta.service';
import { CrearVentaDto } from 'src/dto/create-venta.dto';

@Controller('venta')
export class VentaController {
  constructor(private readonly ventaService: VentaService) {}

  @Post()
  async crearVenta(@Body() dto: CrearVentaDto) {
    return this.ventaService.crearVenta(dto.items);
  }

  @Get()
  async findAll() {
    return this.ventaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ventaService.findOne(+id);
  }
}
