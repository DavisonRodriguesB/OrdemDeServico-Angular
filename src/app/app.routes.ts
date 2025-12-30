import { Routes } from '@angular/router';

import { MainLayoutComponent } from './core/layout/main-layout/main-layout';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard';
import { TeamsComponent } from './features/teams/pages/teams';
import { ServiceOrderComponent } from './features/service-orders/pages/service-order';
import { Allocation } from './features/allocation/pages/allocation/allocation';
import { Routing } from './features/routing/pages/routing/routing';
import { Reports } from './features/reports/pages/reports/reports';

import { ServiceOrderListComponent } from './features/service-orders/pages/service-order-list/service-order-list';
import { ServiceOrderFormComponent } from './features/service-orders/pages/service-order-form/service-order-form';
import { ServiceOrderExecutionComponent } from './features/service-orders/pages/service-order-execution/service-order-execution';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'teams', component: TeamsComponent },

      {
        path: 'service-order',
        component: ServiceOrderComponent,
        children: [
          { path: '', component: ServiceOrderListComponent },
          { path: 'new', component: ServiceOrderFormComponent },
          { path: ':id/edit', component: ServiceOrderFormComponent },
          { path: ':id/execution', component: ServiceOrderExecutionComponent },
        ],
      },

      { path: 'allocation', component: Allocation },
      { path: 'routing', component: Routing },
      { path: 'reports', component: Reports },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];