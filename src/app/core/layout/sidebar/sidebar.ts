import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

// Importação do serviço de autenticação (ajuste o caminho se necessário)
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css', // Mantendo o seu arquivo de CSS se existir
})
export class SidebarComponent implements OnInit {
  // Controle de estado do sidebar (Minimizado/Aberto)
  isCollapsed = false;

  // Armazena dados do usuário logado
  user: {
    name: string;
    email: string;
    role: string;
  } | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  /** Carrega os dados do usuário para uso no template */
  private loadUser(): void {
    this.user = this.authService.getUser();
  }

  /** Alterna entre sidebar expandido e minimizado */
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  /** * Executa o logout chamando o serviço de autenticação
   * e redireciona para a tela de login
   */
  logout(): void {
    // 1. Limpa os dados de sessão através do serviço
    this.authService.logout();
    
    // 2. Navega o usuário para fora do sistema
    this.router.navigate(['/login']);
    
    console.log('Usuário deslogado via Sidebar');
  }
}