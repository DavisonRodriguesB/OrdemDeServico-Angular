import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TeamService } from '../../../../core/services/team.service';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-team-list',
  standalone: true,
  templateUrl: './team-list.html',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
})
export class TeamListComponent {

  teams: Team[] = [];
  searchTerm = '';

  constructor(private teamService: TeamService) {
    this.teams = this.teamService.listar();
  }

  toggleStatus(team: Team): void {
  const novoStatus = team.status === 'ATIVA' ? 'INATIVA' : 'ATIVA';
  this.teamService.alterarStatus(team.id, novoStatus);
  }

  getStatusClass(status: string): string {
    return status === 'ATIVA'
      ? 'text-green-600 bg-green-100'
      : 'text-red-600 bg-red-100';
  }
}