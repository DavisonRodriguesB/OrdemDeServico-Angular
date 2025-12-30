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
    });

    /** Verifica se é edição */
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEdit = true;
      this.osId = Number(idParam);

      const os = this.serviceOrderService.buscarPorId(this.osId);

      if (os) {
        this.form.patchValue(os);
      }
    }
  }

  cancelar(): void {
    this.router.navigate(['/service-order']);
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value as ServiceOrder;

    if (this.isEdit) {
      this.serviceOrderService.atualizar(this.osId, data);
    } else {
      this.serviceOrderService.criar(data);
    }

    // Volta para a listagem
    this.router.navigate(['/service-order']);
  }
}