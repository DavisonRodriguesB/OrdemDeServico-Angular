export type UserRole = 'ADMIN' | 'SUPERVISOR' | 'OPERADOR';

export interface User {
  id: number;
  nome: string;
  email: string;
  role: UserRole;
}