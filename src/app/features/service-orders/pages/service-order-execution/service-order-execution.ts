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

  /** * Mapeamento de status de conclusão baseados no tipo da OS.
   * Evita que um técnico de 'Obras' veja status de 'Comercial'.
   */
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
    // Captura o parâmetro ID da rota (ex: /execucao/123)
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarOS(id);
  }

  /** Busca os dados da OS e inicializa o formulário reativo */
  carregarOS(id: number): void {
    const os = this.serviceOrderService.buscarPorId(id);

    if (!os) {
      this.errorMessage = 'Ordem de serviço não encontrada.';
      return;
    }

    this.serviceOrder = os;

    // Inicialização do formulário com validações
    this.form = this.fb.group({
      retornoCampo: ['', Validators.required], // Campo obrigatório
      observacao: [''],
    });
  }

  /** Getter para facilitar o acesso à lista de status correta no HTML */
  get retornosDisponiveis(): string[] {
    if (!this.serviceOrder) return [];
    return this.retornosPorTipo[this.serviceOrder.tipo] || [];
  }

  /** Captura arquivos selecionados e armazena no array de anexos */
  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.anexos = Array.from(input.files);
  }

  /** Valida o formulário, salva a alteração e redireciona o usuário */
  concluir(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Ativa os avisos de erro no HTML
      return;
    }

    // Persiste a mudança no serviço
    this.serviceOrderService.atualizarStatus(
      this.serviceOrder.id,
      'CONCLUIDO'
    );

    this.successMessage = 'Serviço concluído com sucesso.';

    // Pequeno delay para o usuário ler a mensagem de sucesso antes de sair
    setTimeout(() => {
      this.router.navigate(['/service-order']);
    }, 1300);
  }

  /** Cancela a operação e volta para a listagem */
  cancelar(): void {
    this.router.navigate(['/service-order']);
  }
}