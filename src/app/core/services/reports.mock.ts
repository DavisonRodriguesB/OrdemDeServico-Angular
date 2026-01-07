import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface TeamProductivity {
  equipe: string;
  concluidas: number;
  tempoMedio: string;
  faturamento: number;
  metaFaturamento: number; // Novo campo para o gráfico de metas
  performance: number; 
}

export interface ReportData {
  metrics: {
    totalFaturado: number;
    ticketMedio: number;
    tempoMedioGlobal: string;
    taxaSucesso: number;
  };
  produtividadeEquipes: TeamProductivity[];
  servicosPorTipo: { tipo: string; quantidade: number; faturado: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  getReportData(): Observable<ReportData> {
    return of({
      metrics: {
        totalFaturado: 125400.00,
        ticketMedio: 1850.00,
        tempoMedioGlobal: '01:52:00',
        taxaSucesso: 94
      },
      produtividadeEquipes: [
        { equipe: 'Equipe Comercial 01', concluidas: 23, tempoMedio: '01:30:00', faturamento: 13000, metaFaturamento: 15000, performance: 98 },
        { equipe: 'Equipe Comercial 02', concluidas: 22, tempoMedio: '02:10:00', faturamento: 12000, metaFaturamento: 15000, performance: 85 },
        { equipe: 'Equipe de Obras 01', concluidas: 15, tempoMedio: '01:45:00', faturamento: 38200, metaFaturamento: 35000, performance: 92 },
        { equipe: 'Equipe de Manutenção 02', concluidas: 30, tempoMedio: '02:45:00', faturamento: 27000, metaFaturamento: 45000, performance: 70 }
      ],
      servicosPorTipo: [
        { tipo: 'Obras', quantidade: 15, faturado: 45000 },
        { tipo: 'Manutenção', quantidade: 30, faturado: 35400 },
        { tipo: 'Comercial', quantidade: 45, faturado: 25000 }
      ]
    });
  }
}