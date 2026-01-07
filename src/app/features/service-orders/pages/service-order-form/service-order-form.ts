import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CurrencyMaskDirective } from '../../../../shared/directives/currency-mask.directive';
import { ServiceOrderService } from '../../../../core/services/service-order.service';
import { ServiceOrder } from '../../models/service-order.model';

@Component({
  selector: 'app-service-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyMaskDirective],
  templateUrl: './service-order-form.html',
})
export class ServiceOrderFormComponent implements OnInit {

  form!: FormGroup;

  /** Controle de edição */
  isEdit = false;
  osId!: number;

  constructor(
    private fb: FormBuilder,
    private serviceOrderService: ServiceOrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /** Inicializa o formulário */
  ngOnInit(): void {
    this.form = this.fb.group({
      os: ['', Validators.required],
      servico: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', Validators.required],
      prioridade: ['', Validators.required],
      status: ['ABERTO', Validators.required],

      valor: [0, [Validators.required, Validators.min(0)]],
      prazoDias: [1, [Validators.required, Validators.min(1)]],

      bairro: ['', Validators.required],
      endereco: ['', Validators.required],
      latitude: [null],
      longitude: [null],
      
    });

    /** Verifica se é edição */
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEdit = true;
      this.osId = Number(idParam);

      const os = this.serviceOrderService.buscarPorId(this.osId);

      if (os) {
        this.form.patchValue(os);

        /** BLOQUEIA EDIÇÃO SE CONCLUÍDO OU CANCELADO */
        if (os.status === 'CONCLUIDO' || os.status === 'CANCELADO') {
          this.form.disable();
        }
      }
    }
  }

  cancelar(): void {
    // Apenas volta para a listagem (não altera status aqui)
    this.router.navigate(['/service-order']);
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.getRawValue() as ServiceOrder;
    // getRawValue é importante caso o form esteja desabilitado

    if (this.isEdit) {
      this.serviceOrderService.atualizar(this.osId, data);
    } else {
      this.serviceOrderService.criar(data);
    }

    // Volta para a listagem
    this.router.navigate(['/service-order']);
  }
}