import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Team } from '../../../teams/models/team.model';
import { ServiceOrder } from '../../../service-orders/models/service-order.model';
import { AllocationService } from '../../../../core/services/allocation-service';

declare const google: any;

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
export class RoutingComponent implements AfterViewInit {

  teams: Team[] = [];
  selectedTeamId: number | null = null;

  rotaOrdenada: ServiceOrderRota[] = [];

  /** Controle do modal do mapa */
  mostrarMapa = false;

  /** Instância do mapa do Google */
  map!: any;

  /** Responsável por renderizar a rota no mapa */
  directionsRenderer!: any;

  /** Base fictícia (origem) */
  base = {
    nome: 'Base Operacional - Manaus',
    latitude: -3.1019,
    longitude: -60.0250,
  };

  constructor(private allocationService: AllocationService) {
    this.teams = this.allocationService.listarEquipesAtivas();
  }

  ngAfterViewInit(): void {}

  gerarRota(): void {
    this.rotaOrdenada = [];

    if (!this.selectedTeamId) return;

    const ordens =
      this.allocationService.listarOrdensPorEquipe(this.selectedTeamId);

    if (!ordens.length) return;

    const prioridadePeso: Record<string, number> = {
      URGENTE: 4,
      ALTA: 3,
      MEDIA: 2,
      BAIXA: 1,
    };

    const ordensOrdenadasPorPrioridade = [...ordens].sort(
      (a, b) => prioridadePeso[b.prioridade] - prioridadePeso[a.prioridade]
    );

    let pontoAtual = {
      latitude: this.base.latitude,
      longitude: this.base.longitude,
    };

    const restantes = [...ordensOrdenadasPorPrioridade];

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
        tempoEstimado: menorDistancia * 4,
      });

      pontoAtual = {
        latitude: osSelecionada.latitude,
        longitude: osSelecionada.longitude,
      };
    }
  }

  abrirMapa(): void {
    if (!this.rotaOrdenada.length) return;

    this.mostrarMapa = true;

    setTimeout(() => {
      this.inicializarMapa();
    }, 100);
  }

  fecharMapa(): void {
    this.mostrarMapa = false;
  }

  inicializarMapa(): void {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    this.map = new google.maps.Map(mapElement, {
      center: {
        lat: this.base.latitude,
        lng: this.base.longitude,
      },
      zoom: 12,
    });

    this.desenharRota();
  }

  desenharRota(): void {
    if (!this.rotaOrdenada.length) return;

    const directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();

    this.directionsRenderer.setMap(this.map);

    const waypoints = this.rotaOrdenada.slice(0, -1).map(os => ({
      location: { lat: os.latitude, lng: os.longitude },
      stopover: true,
    }));

    const destinoFinal = this.rotaOrdenada[this.rotaOrdenada.length - 1];

    directionsService.route(
      {
        origin: {
          lat: this.base.latitude,
          lng: this.base.longitude,
        },
        destination: {
          lat: destinoFinal.latitude,
          lng: destinoFinal.longitude,
        },
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result: any, status: any) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          this.directionsRenderer.setDirections(result);
        }
      }
    );
  }

  private calcularDistancia(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371;
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
