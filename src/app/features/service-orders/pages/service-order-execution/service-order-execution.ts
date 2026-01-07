import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ServiceOrder } from '../../models/service-order.model';
import { ServiceOrderService } from '../../../../core/services/service-order.service';

@Component({
  selector: 'app-service-order-execution',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './service-order-execution.html',
})
export class ServiceOrderExecutionComponent {

  serviceOrder!: ServiceOrder;

  form!: FormGroup;
  anexos: File[] = [];

  successMessage = '';
  errorMessage = '';
  isConcluding = false;

  retornosPorTipo: Record<string, string[]> = {
    Comercial: ['Executado', 'Não Executado', 'Não Localizado'],
    Manutenção: ['Manutenção Concluída', 'Necessita Retorno', 'Manutenção não Executada'],
    Obras: ['Obra Concluída', 'Serviço Parcial', 'Obra com Impedimento', 'Obra não realizada'],
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private serviceOrderService: ServiceOrderService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarOS(id);
  }

  carregarOS(id: number): void {
    const os = this.serviceOrderService.buscarPorId(id);

    if (!os) {
      this.errorMessage = 'Ordem de serviço não encontrada.';
      return;
    }

    this.serviceOrder = os;

    this.form = this.fb.group({
      retornoCampo: ['', Validators.required],
      observacao: [''],
    });
  }

  get retornosDisponiveis(): string[] {
    if (!this.serviceOrder) return [];
    return this.retornosPorTipo[this.serviceOrder.tipo] || [];
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.anexos = Array.from(input.files);
  }

    concluir(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.serviceOrderService.atualizarStatus(
      this.serviceOrder.id,
      'CONCLUIDO'
    );

    this.successMessage = 'Serviço concluído com sucesso.';

    setTimeout(() => {
      this.router.navigate(['/service-order']);
    }, 1500);
  }

  cancelar(): void {
    this.router.navigate(['/service-order']);
  }
}
