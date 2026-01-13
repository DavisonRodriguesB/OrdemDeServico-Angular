import { Injectable } from '@angular/core';

export type UserRole = 'ADMIN' | 'SUPERVISOR' | 'OPERADOR';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly ADMIN_USER = {
    nome: 'Administrador',
    email: 'admin@sistema.com',
    password: '@123456',
    role: 'ADMIN' as UserRole,
  };

  login(email: string, password: string): boolean {
  if (
    email === this.ADMIN_USER.email &&
    password === this.ADMIN_USER.password
  ) {
    localStorage.setItem(
      'user',
      JSON.stringify({
        name: this.ADMIN_USER.nome,
        email,
        role: this.ADMIN_USER.role,
      })
    );
    return true;
  }

  return false;
}

  logout(): void {
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  getRole(): UserRole | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : null;
  }

  getUser(): { name: string; email: string; role: string } | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
