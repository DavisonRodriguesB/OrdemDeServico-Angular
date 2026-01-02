export interface Team {
  id: number;
  nome: string;
  tipoServico: string;
  responsavel: string;
  quantidadeMembros: number;
  descricao: string;
  status: 'ATIVA' | 'INATIVA';
}