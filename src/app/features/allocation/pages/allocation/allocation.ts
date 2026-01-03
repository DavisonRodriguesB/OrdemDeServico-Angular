import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ServiceOrder } from '../../../service-orders/models/service-order.model';
import { Team } from '../../../teams/models/team.model';
import { AllocationService } from '../../../../core/services/allocation-service';

@Component({
  selector: 'app-allocation',
  standalone: true,
  imports: [
    CommonModule, // *ngIf, *ngFor
    FormsModule   // ngModel, ngValue
  ],
  templateUrl: './allocation.html',
})
export class AllocationComponent {

  /** Listas */
  serviceOrders: ServiceOrder[] = [];
  teams: Team[] = [];
  filteredTeams: Team[] = [];

  /** Seleções */
  selectedServiceOrderId: number | null = null;
  selectedServiceOrder: ServiceOrder | null = null;
  selectedTeamId: number | null = null;

  /** Feedback */
  errorMessage = '';
  successMessage = '';

  constructor(private allocationService: AllocationService) {
    this.carregarDados();
  }

  carregarDados(): void {
    this.serviceOrders = this.allocationService.listarOrdensDisponiveis();
    this.teams = this.allocationService.listarEquipesAtivas();

    this.resetSelecoes();
  }

  resetSelecoes(): void {
    this.selectedServiceOrderId = null;
    this.selectedServiceOrder = null;
    this.selectedTeamId = null;
    this.filteredTeams = [];
  }

  /** Quando seleciona a OS */
  onServiceOrderChange(): void {
    this.selectedTeamId = null;
    this.filteredTeams = [];

    this.selectedServiceOrder =
      this.serviceOrders.find(os => os.id === this.selectedServiceOrderId) || null;

    if (!this.selectedServiceOrder) {
      return;
    }

    // ⚠️ FILTRO DE EQUIPE POR TIPO (ETAPA 2 – já preparado)
    this.filteredTeams = this.teams.filter(
      team => team.tipoServico === this.selectedServiceOrder!.tipo
    );
  }

  alocar(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.selectedServiceOrderId || !this.selectedTeamId) {
      this.errorMessage = 'Selecione a ordem de serviço e a equipe.';
      return;
    }

    try {
      this.allocationService.alocarServico(
        this.selectedServiceOrderId,
        this.selectedTeamId
      );

      this.successMessage = 'Serviço alocado com sucesso.';
      this.carregarDados();

    } catch (error: any) {
      this.errorMessage = error.message || 'Erro ao alocar serviço.';
    }
  }

  cancelar(): void {
    this.resetSelecoes();
    this.errorMessage = '';
    this.successMessage = '';
  }
}
