import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceOrder } from '../../../service-orders/models/service-order.model';
import { Team } from '../../../teams/models/team.model';
import { AllocationService } from '../../../../core/services/allocation-service';

interface PreviaPorEquipe {
  equipe: Team;
  ordens: ServiceOrder[];
}

@Component({
  selector: 'app-allocated-orders-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allocated-orders-list.html',
})
export class AllocatedOrdersListComponent implements OnInit, OnChanges {

  @Input() teamId?: number | null;

  /** Lista da equipe selecionada */
  ordensAlocadas: ServiceOrder[] = [];

  /** Prévia geral */
  previaPorEquipe: PreviaPorEquipe[] = [];

  constructor(private allocationService: AllocationService) {}

  // 🔹 Carrega prévia ao abrir a tela
  ngOnInit(): void {
    this.carregarPreviaGeral();
  }

  // 🔹 Atualiza quando selecionar equipe
  ngOnChanges(): void {
    if (this.teamId) {
      this.carregarOrdensDaEquipe();
    } else {
      this.carregarPreviaGeral();
    }
  }

  // =========================
  // 🔹 PRÉVIA GERAL
  // =========================
  private carregarPreviaGeral(): void {
    this.previaPorEquipe = [];

    const alocacoes = this.allocationService.listarAlocacoes();
    if (!alocacoes.length) return;

    const equipesMap = new Map<number, PreviaPorEquipe>();

    alocacoes.forEach(alocacao => {
      const equipe =
        this.allocationService.buscarEquipeDaOS(alocacao.serviceOrderId);

      const os =
        this.allocationService.buscarOrdemPorId(alocacao.serviceOrderId);

      if (!equipe || !os) return;

      if (!equipesMap.has(equipe.id)) {
        equipesMap.set(equipe.id, {
          equipe,
          ordens: [],
        });
      }

      equipesMap.get(equipe.id)!.ordens.push(os);
    });

    this.previaPorEquipe = Array.from(equipesMap.values());
  }

  // =========================
  // 🔹 LISTA POR EQUIPE
  // =========================
  private carregarOrdensDaEquipe(): void {
    this.ordensAlocadas = [];

    if (!this.teamId) return;

    this.ordensAlocadas =
      this.allocationService.listarOrdensPorEquipe(this.teamId);
  }
}
