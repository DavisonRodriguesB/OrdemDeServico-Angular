import { Routes } from '@angular/router';

import { MainLayoutComponent } from './core/layout/main-layout/main-layout';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard';
import { TeamsComponent } from './features/teams/pages/teams';
import { ServiceOrderComponent } from './features/service-orders/pages/service-order';
import { AllocationComponent } from './features/allocation/pages/allocation/allocation';

import { ReportsComponent } from './features/reports/pages/reports/reports';

import { ServiceOrderListComponent } from './features/service-orders/pages/service-order-list/service-order-list';
import { ServiceOrderFormComponent } from './features/service-orders/pages/service-order-form/service-order-form';
import { ServiceOrderExecutionComponent } from './features/service-orders/pages/service-order-execution/service-order-execution';
import { TeamFormComponent } from './features/teams/pages/team-form/team-form';
import { TeamListComponent } from './features/teams/pages/team-list/team-list';
import { RoutingComponent } from './features/routing/pages/routing/routing';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
          path: 'teams',
        component: TeamsComponent,
        children: [
          { path: '', component: TeamListComponent, },
          { path: 'new', component: TeamFormComponent },
          { path: ':id/edit', component: TeamFormComponent },
        ],
      },

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

      { path: 'allocation', component: AllocationComponent },
      { path: 'routing', component: RoutingComponent },
      { path: 'reports', component: ReportsComponent },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];