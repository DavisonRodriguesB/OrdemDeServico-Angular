import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Team } from '../../../teams/models/team.model';
import { ServiceOrder } from '../../../service-orders/models/service-order.model';
import { AllocationService } from '../../../../core/services/allocation-service';

interface ServiceOrderRota extends ServiceOrder {
  distancia: number;
  tempoEstimado: number;
}

@Component({
  selector: 'app-routing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './routing.html',
})
export class RoutingComponent {

  teams: Team[] = [];
  selectedTeamId: number | null = null;

  rotaOrdenada: ServiceOrderRota[] = [];

  /** Controle do modal do mapa */
  mostrarMapa = false;

  /** Base fictícia (origem) */
  base = {
    nome: 'Base Operacional - Manaus',
    latitude: -3.1019,
    longitude: -60.0250,
  };

  constructor(private allocationService: AllocationService) {
    this.teams = this.allocationService.listarEquipesAtivas();
  }

  gerarRota(): void {
    this.rotaOrdenada = [];

    if (!this.selectedTeamId) return;

    const ordens =
      this.allocationService.listarOrdensPorEquipe(this.selectedTeamId);

    if (!ordens.length) return;

    this.rotaOrdenada = ordens
      .map(os => {
        const distancia = this.calcularDistancia(
          this.base.latitude,
          this.base.longitude,
          os.latitude,
          os.longitude
        );

        return {
          ...os,
          distancia,
          tempoEstimado: distancia * 4, // 🚗 4 min por km (mock)
        };
      })
      .sort((a, b) => {
        const prioridadePeso = {
          URGENTE: 4,
          ALTA: 3,
          MEDIA: 2,
          BAIXA: 1,
        };

        const prioridadeDiff =
          prioridadePeso[b.prioridade] - prioridadePeso[a.prioridade];

        return prioridadeDiff !== 0
          ? prioridadeDiff
          : a.distancia - b.distancia;
      });
  }

  /** Cálculo simples de distância (Haversine simplificado) */
  private calcularDistancia(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return +(R * c).toFixed(2);
  }

  private deg2rad(valor: number): number {
    return valor * (Math.PI / 180);
  }
}
