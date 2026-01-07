import { Routes } from '@angular/router';

/** Layout */
import { MainLayoutComponent } from './core/layout/main-layout/main-layout';

/** Auth */
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './features/auth/pages/login/login';

/** Dashboard */
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard';

/** Teams */
import { TeamsComponent } from './features/teams/pages/teams';
import { TeamListComponent } from './features/teams/pages/team-list/team-list';
import { TeamFormComponent } from './features/teams/pages/team-form/team-form';

/** Service Orders */
import { ServiceOrderComponent } from './features/service-orders/pages/service-order';
import { ServiceOrderListComponent } from './features/service-orders/pages/service-order-list/service-order-list';
import { ServiceOrderFormComponent } from './features/service-orders/pages/service-order-form/service-order-form';
import { ServiceOrderExecutionComponent } from './features/service-orders/pages/service-order-execution/service-order-execution';

/** Outros */
import { AllocationComponent } from './features/allocation/pages/allocation/allocation';
import { ReportsComponent } from './features/reports/pages/reports/reports';
import { RoutingComponent } from './features/routing/pages/routing/routing';

export const routes: Routes = [

  /**  LOGIN (rota pública) */
  {
    path: 'login',
    component: LoginComponent,
  },

  /**  SISTEMA (rotas protegidas) */
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [

      /** Dashboard */
      { path: 'dashboard', component: DashboardComponent },

      /** Teams */
      {
        path: 'teams',
        component: TeamsComponent,
        children: [
          { path: '', component: TeamListComponent },
          { path: 'new', component: TeamFormComponent },
          { path: ':id/edit', component: TeamFormComponent },
        ],
      },

      /** Service Orders */
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

      /** Allocation */
      { path: 'allocation', component: AllocationComponent },

      /** Routing */
      { path: 'routing', component: RoutingComponent },

      /** Reports */
      { path: 'reports', component: ReportsComponent },

      /** Default */
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  /** Fallback */
  { path: '**', redirectTo: 'login' },
];
