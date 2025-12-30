import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { ServiceOrder } from '../../models/service-order.model';
import { ServiceOrderService } from '../../../../core/services/service-order.service';

@Component({
  selector: 'app-service-order-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './service-order-list.html',
  styleUrls: ['./service-order-list.css'],
})
export class ServiceOrderListComponent implements OnInit {

  /** Texto digitado no filtro */
  searchTerm = '';

  /** Fonte de dados */
  allServiceOrders: ServiceOrder[] = [];

  constructor(
    private serviceOrderService: ServiceOrderService
  ) {}

  ngOnInit(): void {
    this.allServiceOrders = this.serviceOrderService.listar();
  }

  /**
   * Lista filtrada automaticamente
   */
  get serviceOrders(): ServiceOrder[] {
    if (!this.searchTerm) {
      return this.allServiceOrders;
    }

    const term = this.searchTerm.toLowerCase();

    return this.allServiceOrders.filter(os =>
      os.os.toLowerCase().includes(term) ||
      os.servico.toLowerCase().includes(term) ||
      os.tipo.toLowerCase().includes(term) ||
      os.prioridade.toLowerCase().includes(term) ||
      os.status.toLowerCase().includes(term) ||
      os.bairro.toLowerCase().includes(term)
    );
  }

  /** Exportar Excel */
  exportToExcel(): void {
    const data = this.serviceOrders.map(os => ({
      OS: os.os,
      Serviço: os.servico,
      Tipo: os.tipo,
      Prioridade: os.prioridade,
      Status: os.status,
      Bairro: os.bairro,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ordens de Serviço');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });

    saveAs(blob, 'ordens-de-servico.xlsx');
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      ABERTO: 'bg-slate-200 text-gray-800',
      ATRIBUIDO: 'bg-blue-100 text-blue-800',
      EM_EXECUCAO: 'bg-yellow-100 text-yellow-800',
      CONCLUIDO: 'bg-green-200 text-green-800',
      CANCELADO: 'bg-red-100 text-red-800',
    };

    return map[status] ?? 'bg-gray-100';
  }

  getPriorityClass(priority: string): string {
    const map: Record<string, string> = {
      BAIXA: 'bg-slate-200 text-slate-700',
      MEDIA: 'bg-indigo-100 text-indigo-700',
      ALTA: 'bg-orange-100 text-orange-800',
      URGENTE: 'bg-red-100 text-red-800',
    };

    return map[priority] ?? 'bg-slate-100';
  }
}