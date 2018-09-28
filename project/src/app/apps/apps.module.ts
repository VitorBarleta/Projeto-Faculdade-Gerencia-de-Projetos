import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatInputModule, MatToolbarModule, MatIconModule,
   MatCardModule, MatTabsModule, MatGridListModule } from '@angular/material';

import 'hammerjs';
import { Routes, RouterModule } from '@angular/router';
import { AppsComponent } from './apps.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FastNotesComponent } from './fast-notes/fast-notes.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const route: Routes = [
  {path: 'apps', component: AppsComponent, children: [
    {path: 'home', component: HomeComponent},
    {path: 'fast-notes', component: FastNotesComponent},
    {path: 'calendar', component: CalendarComponent}
  ]}
]

@NgModule({
  declarations: [
      AppsComponent,
      HomeComponent,
      FastNotesComponent,
      CalendarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forChild(route),
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
    MatTabsModule,
    FlexLayoutModule,
    MatGridListModule
  ],
  exports: [    
  ],
  providers: [],
  bootstrap: []
})
export class AppsModule { }
