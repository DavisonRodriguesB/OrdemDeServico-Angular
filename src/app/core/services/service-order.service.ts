import { Injectable } from '@angular/core';
import { ServiceOrder } from '../../features/service-orders/models/service-order.model';
import { SERVICE_ORDERS_MOCK } from './service-order.mock';

@Injectable({
  providedIn: 'root',
})
export class ServiceOrderService {

  private serviceOrders: ServiceOrder[] = [...SERVICE_ORDERS_MOCK];

  listar(): ServiceOrder[] {
    return this.serviceOrders;
  }

  criar(ordem: ServiceOrder): void {
    const novoId =
      this.serviceOrders.length > 0
        ? Math.max(...this.serviceOrders.map(o => o.id)) + 1
        : 1;

    const novaOS: ServiceOrder = {
      ...ordem,
      id: novoId,
    };

    this.serviceOrders.push(novaOS);
  }

  buscarPorId(id: number): ServiceOrder | undefined {
    return this.serviceOrders.find(o => o.id === id);
  }
}