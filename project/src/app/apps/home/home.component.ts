import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { HomeService } from './home.service';
import { fade } from 'src/app/app.animations';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { IEvent } from 'src/app/core/IEvent';
import { CalendarEvent } from '../calendar/calendar.event-status';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fade
  ]
})

export class HomeComponent implements OnInit, AfterViewInit {
  public events: Array<IEvent>;
  public isLoading: boolean = false;
  public displayedColumns: string[] = ['titulo', 'date'];

  public eventStatus: Array<any> = CalendarEvent.status;

  public eventsToShow: IEvent;

  public currentDay: number = new Date().getDate();
  public currentMonth: number = new Date().getMonth();
  public currentYear: number = new Date().getFullYear();


  public resultsLength: number = 50;

  constructor(
    @ViewChild(MatPaginator, {static: false}) public paginator: MatPaginator,
    private _service: HomeService,
    private _toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.getAll();
    document.title = 'OrganizYou | Início';
  }

  ngAfterViewInit() {
    console.log(this.paginator.pageSize);
  }

  public showDetails(event: IEvent): void {
    this.eventsToShow = event;
  }

  public mobileList(): boolean {
    if (window.innerWidth < 960)
      return true;
    return false;
  }

  private getAll(): void {
    this.isLoading = true;
    this._service.GetAllEventsAsync().then((response: Array<IEvent>) => {
      this.isLoading = false;
      this.events = response;
    }).catch((error: HttpErrorResponse) => {
      this.isLoading = false;
      this._toastr.error(error.statusText, 'Não foi possível carregar os eventos.');
    });
  }
}
