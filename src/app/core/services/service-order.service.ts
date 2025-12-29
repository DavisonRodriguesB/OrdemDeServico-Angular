import { ServiceOrder } from '../../features/service-orders/models/service-order.model';

export const SERVICE_ORDERS_MOCK: ServiceOrder[] = [
  {
    id: 1,
    osNumber: 'OS-2025-001',
    name: 'Instalação de ponto comercial',
    type: 'COMERCIAL',
    priority: 'ALTA',
    status: 'ABERTO',
    value: 4500,
    deadlineDays: 5,
    neighborhood: 'Centro',
  },
  {
    id: 2,
    osNumber: 'OS-2025-002',
    name: 'Manutenção elétrica',
    type: 'MANUTENCAO',
    priority: 'MEDIA',
    status: 'EM_EXECUCAO',
    value: 1200,
    deadlineDays: 2,
    neighborhood: 'Vila Nova',
  },
  {
    id: 3,
    osNumber: 'OS-2025-003',
    name: 'Reforma de fachada',
    type: 'OBRAS',
    priority: 'URGENTE',
    status: 'ATRIBUIDO',
    value: 9800,
    deadlineDays: 10,
    neighborhood: 'Jardim Sul',
  },
];