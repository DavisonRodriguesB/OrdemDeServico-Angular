import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {

  form!: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  entrar(): void {
    this.error = '';

    if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
    }

    const { email, password } = this.form.value;

    const autenticado = this.authService.login(email, password);

    if (!autenticado) {
        this.error = 'Usuário ou senha inválidos.';
        return;
    }

    this.router.navigate(['/dashboard']);
    }
}
