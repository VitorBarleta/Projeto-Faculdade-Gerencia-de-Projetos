import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { HomeService } from './home.service';
import { fade } from 'src/app/app.animations';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { IEvent } from 'src/app/core/IEvent';
import { CalendarEvent } from '../calendar/calendar.event-status';
import { MatPaginator, PageEvent } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fade
  ]
})

export class HomeComponent implements OnInit {
  public events: Array<IEvent>;
  public isLoading: boolean = false;
  public displayedColumns: string[] = ['titulo', 'date'];

  public eventStatus: Array<any> = CalendarEvent.status;

  public eventsToShow: IEvent;

  public paginatorEvent: PageEvent;

  constructor(
    private _service: HomeService,
    private _toastr: ToastrService
  ) {
    this.paginatorEvent = new PageEvent();
  }

  ngOnInit() {
    this.getEvents(this.paginatorEvent);
    document.title = 'OrganizYou | Início';
  }

  public showDetails(event: IEvent): void {
    this.eventsToShow = event;
  }

  private getEvents(paginatorEvent: PageEvent): void {
    this.isLoading = true;
    this._service.getAllEvents(paginatorEvent).then((response: Array<IEvent>) => {
      this.isLoading = false;
      this.events = response;
    }).catch((error: HttpErrorResponse) => {
      this.isLoading = false;
      this._toastr.error(error.statusText, 'Não foi possível carregar os eventos.');
    });
  }
}
