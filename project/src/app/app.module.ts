import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule, MatInputModule, MatToolbarModule, MatIconModule,
   MatCardModule } from '@angular/material';

import 'hammerjs';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { AppsModule } from './apps/apps.module';
import { Error404Component } from './error404/error404.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const route: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: '**', component: Error404Component}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(route),
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    AppsModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
