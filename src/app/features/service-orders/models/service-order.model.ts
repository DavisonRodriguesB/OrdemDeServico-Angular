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
  | 'COMERCIAL'
  | 'MANUTENCAO'
  | 'OBRAS';

export interface ServiceOrder {
  id: number;
  osNumber: string;
  name: string;
  type: ServiceOrderType;
  priority: ServiceOrderPriority;
  status: ServiceOrderStatus;
  value: number;
  deadlineDays: number;
  neighborhood: string;
}