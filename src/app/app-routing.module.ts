import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { DashboardRoutes } from './dashboard/dashboard.routes';


const routes: Routes = [
  { path: '', component: LoginComponent },
  ...DashboardRoutes
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
