import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


export interface DashboardData {
  kpis: {
    total: number;
    abertas: number;
    emExecucao: number;
    concluidas: number;
    urgentes: number;
  };
  equipesAlocacao: { nome: string; quantidade: number }[];
  statusDistribuicao: { label: string; valor: number; cor: string; percentual: number }[];
  prioritarias: { id: string; prioridade: string; bairro: string }[];
  resumoEquipes: { ativas: number; comServico: number; semServico: number };
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  getDashboardData(): Observable<DashboardData> {
    const data: DashboardData = {
      kpis: { total: 18, abertas: 6, emExecucao: 4, concluidas: 8, urgentes: 3 },
      equipesAlocacao: [
        { nome: 'Equipe Comercial', quantidade: 8 },
        { nome: 'Equipe de Manutenção', quantidade: 4 },
        { nome: 'Equipe de Obras', quantidade: 2 }
      ],
      statusDistribuicao: [
        { label: 'Concluídas', valor: 8, cor: 'bg-green-500', percentual: 45 },
        { label: 'Em execução', valor: 4, cor: 'bg-yellow-500', percentual: 25 },
        { label: 'Abertas', valor: 3, cor: 'bg-blue-500', percentual: 20 },
        { label: 'Urgentes', valor: 3, cor: 'bg-red-500', percentual: 10 }
      ],
      prioritarias: [
        { id: 'OS 2025-003', prioridade: 'URGENTE', bairro: 'Planalto' },
        { id: 'OS 2025-007', prioridade: 'ALTA', bairro: 'Alvorada' },
        { id: 'OS 2025-011', prioridade: 'ALTA', bairro: 'Cidade Nova' }
      ],
      resumoEquipes: { ativas: 9, comServico: 7, semServico: 1 }
    };
    return of(data);
  }
}