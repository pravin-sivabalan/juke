import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DashboardComponent } from './dashboard.component';
import { MdAutocompleteModule } from '@angular/material';
import { MdInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { AuthService } from '../shared/services/auth.service';

import { SearchComponent } from '../search/search.component';
import { TracksComponent } from '../tracks/tracks.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SearchComponent,
    TracksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MdAutocompleteModule,
    BrowserAnimationsModule,
    MdInputModule
  ],
  providers: [CookieService, AuthGuardService, AuthService],
  exports: [DashboardComponent]
})
export class DashboardModule { }
