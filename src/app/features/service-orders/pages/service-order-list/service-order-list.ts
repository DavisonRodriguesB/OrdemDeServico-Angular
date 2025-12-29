import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ServiceOrder } from '../../models/service-order.model';
import { SERVICE_ORDERS_MOCK } from '../../../../core/services/service-order.service';

@Component({
  selector: 'app-service-order-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './service-order-list.html',
  styleUrls: ['./service-order-list.css'],
})

export class ServiceOrderListComponent {
  serviceOrders: ServiceOrder[] = SERVICE_ORDERS_MOCK;

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      ABERTO: 'bg-gray-100 text-gray-800',
      ATRIBUIDO: 'bg-blue-100 text-blue-800',
      EM_EXECUCAO: 'bg-yellow-100 text-yellow-800',
      CONCLUIDO: 'bg-green-100 text-green-800',
      CANCELADO: 'bg-red-100 text-red-800',
    };

    return map[status] ?? 'bg-gray-100';
  }

  getPriorityClass(priority: string): string {
    const map: Record<string, string> = {
      BAIXA: 'bg-slate-100 text-slate-700',
      MEDIA: 'bg-indigo-100 text-indigo-700',
      ALTA: 'bg-orange-100 text-orange-800',
      URGENTE: 'bg-red-100 text-red-800',
    };

    return map[priority] ?? 'bg-slate-100';
  }
}