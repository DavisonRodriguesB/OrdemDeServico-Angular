import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { TeamService } from '../../../core/services/team.service';
import { Team } from '../models/team.model';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './teams.html',
})
export class TeamsComponent {

  /** Texto do filtro */
  searchTerm = '';

  /** Lista base */
  allTeams: Team[] = [];

  constructor(
    private teamService: TeamService,
    private router: Router
  ) {
    this.carregarEquipes();
  }

  /** Carrega equipes do service */
  carregarEquipes(): void {
    this.allTeams = this.teamService.listar();
  }

  /** Lista filtrada */
  get teams(): Team[] {
    if (!this.searchTerm) {
      return this.allTeams;
    }

    const term = this.searchTerm.toLowerCase();

    return this.allTeams.filter(team =>
      team.nome.toLowerCase().includes(term) ||
      team.tipoServico.toLowerCase().includes(term) ||
      team.responsavel.toLowerCase().includes(term)
    );
  }

  /** Navega para criar nova equipe */
  criarEquipe(): void {
    this.router.navigate(['/teams/new']);
  }

  /** Navega para edição da equipe */
  editarEquipe(id: number): void {
    this.router.navigate(['/teams', id, 'edit']);
  }

  /** Alterna status da equipe */
  toggleStatus(team: Team): void {
    const novoStatus = team.status === 'ATIVA'
      ? 'INATIVA'
      : 'ATIVA';

    this.teamService.alterarStatus(team.id, novoStatus);
    this.carregarEquipes();
  }

  /** Classe visual do status */
  getStatusClass(status: string): string {
    return status === 'ATIVA'
      ? 'bg-green-200 text-green-800'
      : 'bg-gray-200 text-gray-700';
  }
}