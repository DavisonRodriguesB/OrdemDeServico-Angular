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

    /** Peso por prioridade */
    const prioridadePeso: Record<string, number> = {
      URGENTE: 4,
      ALTA: 3,
      MEDIA: 2,
      BAIXA: 1,
    };

    /** Ordena inicialmente por prioridade */
    const ordensOrdenadasPorPrioridade = [...ordens].sort(
      (a, b) => prioridadePeso[b.prioridade] - prioridadePeso[a.prioridade]
    );

    /** Ponto inicial começa na base */
    let pontoAtual = {
      latitude: this.base.latitude,
      longitude: this.base.longitude,
    };

    const restantes = [...ordensOrdenadasPorPrioridade];

    /** Algoritmo: próxima OS mais próxima do ponto atual */
    while (restantes.length) {
      let indiceMaisProxima = 0;
      let menorDistancia = Infinity;

      restantes.forEach((os, index) => {
        const distancia = this.calcularDistancia(
          pontoAtual.latitude,
          pontoAtual.longitude,
          os.latitude,
          os.longitude
        );

        if (distancia < menorDistancia) {
          menorDistancia = distancia;
          indiceMaisProxima = index;
        }
      });

      const osSelecionada = restantes.splice(indiceMaisProxima, 1)[0];

      this.rotaOrdenada.push({
        ...osSelecionada,
        distancia: menorDistancia,
        tempoEstimado: menorDistancia * 4, // regra atual de tempo
      });

      /** Atualiza ponto atual para a OS atendida */
      pontoAtual = {
        latitude: osSelecionada.latitude,
        longitude: osSelecionada.longitude,
      };
    }
  }

  /** Cálculo de distância (Haversine) */
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
