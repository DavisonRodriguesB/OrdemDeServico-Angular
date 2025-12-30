import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CurrencyMaskDirective } from '../../../../shared/directives/currency-mask.directive';

@Component({
  selector: 'app-service-order-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    CurrencyMaskDirective
  ],
  templateUrl: './service-order-form.html',
})
export class ServiceOrderFormComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      numero: ['', Validators.required],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', Validators.required],
      prioridade: ['', Validators.required],
      status: ['ABERTA', Validators.required],
      valor: [0, [Validators.required]],
      prazo: [1, [Validators.required, Validators.min(1)]],
      endereco: ['', Validators.required],
      bairro: ['', Validators.required],
      latitude: [''],
      longitude: [''],
    });
  }

  salvar(): void {
    console.log(this.form.value);
    // valor → number (ex: 1234.56)
  }
}