import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventarioModule } from './inventario/inventario.module';
import { Producto } from './inventario/producto.entity';
import { VentaModule } from './venta/venta.module';
import { Venta } from './venta/venta.entity';
import { DetalleVenta } from './venta/detalle-venta.entity';
import { ReportesModule } from './reportes/reportes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'vivero.db',
      entities: [Producto,Venta,DetalleVenta],
      synchronize: true, // crea tablas automáticamente en desarrollo
    }),
    InventarioModule,
    VentaModule,
    ReportesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
