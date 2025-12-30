import { Injectable } from '@angular/core';
import { ServiceOrder } from '../../features/service-orders/models/service-order.model';
import { SERVICE_ORDERS_MOCK } from './service-order.mock';

@Injectable({
  providedIn: 'root',
})
export class ServiceOrderService {

  private serviceOrders: ServiceOrder[] = [...SERVICE_ORDERS_MOCK];

  /** Listar todas as OS */
  listar(): ServiceOrder[] {
    return this.serviceOrders;
  }

  /** Buscar OS por ID */
  buscarPorId(id: number): ServiceOrder | undefined {
    return this.serviceOrders.find(os => os.id === id);
  }

  /** Criar nova OS */
  criar(os: ServiceOrder): void {
    const novoId =
      this.serviceOrders.length > 0
        ? Math.max(...this.serviceOrders.map(o => o.id)) + 1
        : 1;

    this.serviceOrders.push({
      ...os,
      id: novoId,
    });
  }

  /** Atualizar OS existente */
  atualizar(id: number, osAtualizada: ServiceOrder): void {
    const index = this.serviceOrders.findIndex(os => os.id === id);

    if (index !== -1) {
      this.serviceOrders[index] = {
        ...osAtualizada,
        id,
      };
    }
  }
}