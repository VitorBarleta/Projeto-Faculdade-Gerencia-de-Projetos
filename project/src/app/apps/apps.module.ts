import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule, MatInputModule, MatToolbarModule, MatIconModule, MatProgressSpinnerModule,
  MatCardModule, MatTabsModule, MatGridListModule, MatDialogModule, MatSelectModule, MatDatepickerModule,
  MatNativeDateModule, MAT_DATE_LOCALE, MatExpansionModule, MatSlideToggleModule, MatTooltipModule, MatTableModule, MatSortModule
} from '@angular/material';

import 'hammerjs';
import { Routes, RouterModule } from '@angular/router';
import { AppsComponent } from './apps.component';
import { DialogConfirmComponent } from './dialog/dialog.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FastNotesComponent } from './fast-notes/fast-notes.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NewEventComponent } from './calendar/new-event/new-event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FastNotesDialogComponent } from './fast-notes/fast-notes-dialog/fast-notes-dialog.component';
import { AuthGuard } from '../guards/auth.guard';

const route: Routes = [
  {
    path: '', component: AppsComponent, children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'fast-notes', component: FastNotesComponent, canActivate: [AuthGuard] },
      { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    AppsComponent,
    HomeComponent,
    FastNotesComponent,
    CalendarComponent,
    NewEventComponent,
    DialogConfirmComponent,
    FastNotesDialogComponent
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
    MatGridListModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatTableModule,
    ToastrModule.forRoot({ preventDuplicates: true })
  ],
  exports: [
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    AuthGuard
  ],
  bootstrap: [],
  entryComponents: [NewEventComponent, DialogConfirmComponent, FastNotesDialogComponent]
})
export class AppsModule { }
