import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardData, DashboardService } from '../../../../core/services/dashboard-service.mock';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})

export class DashboardComponent implements OnInit {
  data!: DashboardData;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe(res => {
      this.data = res;
    });
  }

  getDashboardData(): Observable<DashboardData> {
  return of({
    kpis: { total: 18, abertas: 6, emExecucao: 4, concluidas: 8, urgentes: 3 },
    faturamentoTotal: 45250.00, // Novo dado
    equipesAlocacao: [
      { nome: 'Equipe Alfa', quantidade: 3 },
      { nome: 'Equipe Beta', quantidade: 2 },
      { nome: 'Equipe Gama', quantidade: 2 }
    ],
    statusDistribuicao: [
      { label: 'Concluídas', valor: 8, cor: 'bg-green-500', percentual: 45 },
      { label: 'Em execução', valor: 4, cor: 'bg-yellow-500', percentual: 25 },
      { label: 'Abertas', valor: 3, cor: 'bg-blue-500', percentual: 20 },
      { label: 'Urgentes', valor: 3, cor: 'bg-red-500', percentual: 10 }
    ],
    // Novo: Distribuição por Tipo de Serviço
    faturamentoPorTipo: [
      { tipo: 'Obras', valor: 28000, percentual: 60 },
      { tipo: 'Manutenção', valor: 12250, percentual: 25 },
      { tipo: 'Comercial', valor: 5000, percentual: 15 }
    ],
    prioritarias: [
      { id: 'OS 2025-003', prioridade: 'URGENTE', bairro: 'Planalto' },
      { id: 'OS 2025-007', prioridade: 'ALTA', bairro: 'Alvorada' },
      { id: 'OS 2025-011', prioridade: 'ALTA', bairro: 'Cidade Nova' }
    ],
    resumoEquipes: { ativas: 4, comServico: 3, semServico: 1 }
  });
}
}