import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './venta.entity';
import { DetalleVenta } from './detalle-venta.entity';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { Producto } from 'src/inventario/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venta, DetalleVenta,Producto])],
  controllers: [VentaController],
  providers: [VentaService],
})
export class VentaModule {}
