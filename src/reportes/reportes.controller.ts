import { Controller, Get, Query } from '@nestjs/common';
import { ReportesService } from './reportes.service';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('ganancias')
  async getGanancias(
    @Query('periodo') periodo?: 'dia' | 'semana' | 'mes' | 'año',
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    if (from && to) {
      // Modo rango de fechas personalizado
      return this.reportesService.gananciasPorRango(new Date(from), new Date(to));
    }

    // Modo periodo fijo (por defecto: mes)
    return this.reportesService.gananciasPorPeriodo(periodo ?? 'mes');
  }
}
