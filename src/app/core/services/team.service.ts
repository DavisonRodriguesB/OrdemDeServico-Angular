import { Injectable } from '@angular/core';
import { Team } from '../../features/teams/models/team.model';
import { TEAM_MOCK } from './team.mock';

@Injectable({ providedIn: 'root' })
export class TeamService {

  private teams: Team[] = [...TEAM_MOCK];

  listar(): Team[] {
    return this.teams;
  }

  buscarPorId(id: number): Team | undefined {
    return this.teams.find(t => t.id === id);
  }

  criar(team: Team): void {
    const novoId = Math.max(...this.teams.map(t => t.id), 0) + 1;
    this.teams.push({ ...team, id: novoId });
  }

  atualizar(id: number, dados: Team): void {
    const index = this.teams.findIndex(t => t.id === id);
    if (index !== -1) {
      this.teams[index] = { ...dados, id };
    }
  }

  alterarStatus(id: number, status: 'ATIVA' | 'INATIVA'): void {
    const team = this.teams.find(t => t.id === id);
    if (team) {
      team.status = status;
    }
  }
}