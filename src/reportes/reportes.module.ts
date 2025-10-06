
// src/reportes/reportes.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';
import { Venta } from 'src/venta/venta.entity';
import { DetalleVenta } from 'src/venta/detalle-venta.entity';
import { Producto } from 'src/inventario/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venta, DetalleVenta, Producto])],
  controllers: [ReportesController],
  providers: [ReportesService],
})
export class ReportesModule {}
