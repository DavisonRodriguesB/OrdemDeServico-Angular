import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard/dashboard')
        .then(c => c.DashboardComponent)
  },

  {
    path: 'teams',
    loadComponent: () =>
      import('./features/teams/services/teams/teams')
        .then(c => c.TeamsComponent)
  },

  {
    path: 'reports',
    loadComponent: () =>
      import('./features/reports/pages/reports/reports')
        .then(c => c.Reports)
  },

  {
    path: 'allocation',
    loadComponent: () =>
      import('./features/allocation/pages/allocation/allocation')
        .then(c => c.Allocation)
  },

  {
    path: 'routing',
    loadComponent: () =>
      import('./features/routing/pages/routing/routing')
        .then(c => c.Routing)
  },

  {
    path: 'service-orders',
    loadComponent: () =>
      import('./features/service-orders/services/service-order/service-order')
        .then(c => c.ServiceOrder)
  },

  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];