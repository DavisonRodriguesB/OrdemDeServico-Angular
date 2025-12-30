import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CurrencyMaskDirective } from '../../../../shared/directives/currency-mask.directive';

import { ServiceOrderService } from '../../../../core/services/service-order.service';

@Component({
  selector: 'app-service-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyMaskDirective],
  templateUrl: './service-order-form.html',
})
export class ServiceOrderFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serviceOrderService: ServiceOrderService,
    private router: Router
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
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.serviceOrderService.criar(this.form.value);

    // Volta para a listagem
    this.router.navigate(['/service-order']);
  }
}