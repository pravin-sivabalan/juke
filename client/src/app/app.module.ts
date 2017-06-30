import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { HttpClient } from './http-client';
import { CookieService } from 'angular2-cookie/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ HttpClient, CookieService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
