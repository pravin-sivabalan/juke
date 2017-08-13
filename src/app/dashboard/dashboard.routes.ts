import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';

export const DashboardRoutes: Routes = [
  { path: 'dash', canActivate: [AuthGuardService], component: DashboardComponent }
];
