export type ServiceOrderStatus =
  | 'ABERTO'
  | 'ATRIBUIDO'
  | 'EM_EXECUCAO'
  | 'CONCLUIDO'
  | 'CANCELADO';

export type ServiceOrderPriority =
  | 'BAIXA'
  | 'MEDIA'
  | 'ALTA'
  | 'URGENTE';

export type ServiceOrderType =
  | 'Comercial'
  | 'Manutenção'
  | 'Obras';

export interface ServiceOrder {
  id: number;
  os: string;
  servico: string;
  tipo: ServiceOrderType;
  prioridade: ServiceOrderPriority;
  status: ServiceOrderStatus;
  valor: number;
  prazoDias: number;
  bairro: string;
}