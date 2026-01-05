import { Injectable } from '@angular/core';
import { ServiceOrder } from '../../features/service-orders/models/service-order.model';
import { Team } from '../../features/teams/models/team.model';
import { SERVICE_ORDERS_MOCK } from './service-order.mock';
import { TEAM_MOCK } from './team.mock';

export interface ServiceAllocation {
  serviceOrderId: number;
  teamId: number;
  dataAlocacao: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AllocationService {

  /** Mock de alocações */
  private allocations: ServiceAllocation[] = [];

  // ===============================
  // ORDENS DE SERVIÇO
  // ===============================

  /** Retorna todas as OS disponíveis para alocação */
  listarOrdensDisponiveis(): ServiceOrder[] {
    return SERVICE_ORDERS_MOCK.filter(
      os => os.status === 'ABERTO' || os.status === 'ATRIBUIDO'
    );
  }

  /** Busca uma OS pelo ID */
  buscarOrdemPorId(serviceOrderId: number): ServiceOrder | null {
    return SERVICE_ORDERS_MOCK.find(os => os.id === serviceOrderId) || null;
  }

  // ===============================
  // EQUIPES
  // ===============================

  /** Retorna equipes ativas */
  listarEquipesAtivas(): Team[] {
    return TEAM_MOCK.filter(team => team.status === 'ATIVA');
  }

  /**
   *  REGRA DE NEGÓCIO
   * Retorna apenas equipes compatíveis com o tipo da OS
   */
  listarEquipesPorTipoServico(tipoServico: string): Team[] {
    return TEAM_MOCK.filter(
      team =>
        team.status === 'ATIVA' &&
        team.tipoServico === tipoServico
    );
  }

  // ===============================
  // ALOCAÇÕES
  // ===============================

  /** Retorna alocações existentes */
  listarAlocacoes(): ServiceAllocation[] {
    return this.allocations;
  }

  /** Alocar uma OS para uma equipe */
  alocarServico(serviceOrderId: number, teamId: number): void {
    const jaAlocado = this.allocations.find(
      a => a.serviceOrderId === serviceOrderId
    );

    if (jaAlocado) {
      throw new Error('Esta ordem de serviço já está alocada.');
    }

    const os = this.buscarOrdemPorId(serviceOrderId);
    if (!os) {
      throw new Error('Ordem de serviço não encontrada.');
    }

    const equipesValidas = this.listarEquipesPorTipoServico(os.tipo);
    const equipeValida = equipesValidas.find(team => team.id === teamId);

    if (!equipeValida) {
      throw new Error(
        'Equipe incompatível com o tipo de serviço da ordem.'
      );
    }

    this.allocations.push({
      serviceOrderId,
      teamId,
      dataAlocacao: new Date(),
    });

    // Atualiza status da OS (mock)
    os.status = 'ATRIBUIDO';
  }

  /** Remover alocação (futuro: realocar) */
  removerAlocacao(serviceOrderId: number): void {
    this.allocations = this.allocations.filter(
      a => a.serviceOrderId !== serviceOrderId
    );

    const os = this.buscarOrdemPorId(serviceOrderId);
    if (os) {
      os.status = 'ABERTO';
    }
  }

  /** Buscar equipe alocada a uma OS */
  buscarEquipeDaOS(serviceOrderId: number): Team | null {
    const allocation = this.allocations.find(
      a => a.serviceOrderId === serviceOrderId
    );

    if (!allocation) return null;

    return TEAM_MOCK.find(t => t.id === allocation.teamId) || null;
  }


  /**
   * Retorna todas as Ordens de Serviço atribuídas a uma equipe
   */
  listarOrdensPorEquipe(teamId: number): ServiceOrder[] {
    const osIds = this.allocations
      .filter(a => a.teamId === teamId)
      .map(a => a.serviceOrderId);

    return SERVICE_ORDERS_MOCK.filter(os => osIds.includes(os.id));
  }
}
