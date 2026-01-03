import { Team } from '../../features/teams/models/team.model';

// Mock de equipes
// Usado enquanto não temos backend
export const TEAM_MOCK: Team[] = [
  {
    id: 1,
    nome: 'Equipe Comercial 01',
    tipoServico: 'Comercial',
    responsavel: 'Carlos Silva',
    descricao: 'Equipe responsável por corte e religação',
    quantidadeMembros: 2,
    status: 'ATIVA',
  },
  {
    id: 2,
    nome: 'Equipe Manutenção 01',
    tipoServico: 'Manutenção',
    responsavel: 'Mariana Souza',
    descricao: 'Equipe responsável por manutenção preventiva',
    quantidadeMembros: 3,
    status: 'ATIVA',
  },
  {
    id: 3,
    nome: 'Equipe Obras 01',
    tipoServico: 'Obras',
    responsavel: 'João Pereira',
    descricao: 'Equipe responsável por obras de grande porte',
    quantidadeMembros: 6,
    status: 'INATIVA',
  },

  {
    id: 3,
    nome: 'Equipe Obras 02',
    tipoServico: 'Obras',
    responsavel: 'Raimundo Gomes',
    descricao: 'Equipe responsável por obras de grande porte',
    quantidadeMembros: 6,
    status: 'ATIVA',
  },

  {
    id: 4,
    nome: 'Equipe Comercial 02',
    tipoServico: 'Comercial',
    responsavel: 'Pedro Souza',
    descricao: 'Equipe responsável ligação nova',
    quantidadeMembros: 2,
    status: 'ATIVA',
  },
];