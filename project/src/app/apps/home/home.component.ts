import { Component, OnInit } from '@angular/core';
import { MatDialogTitle, MatTableDataSource, Sort } from '@angular/material';
import { HomeService } from './home.service';
import { fade } from 'src/app/app.animations';
import { ToastrService, ActiveToast } from 'ngx-toastr';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { HttpErrorResponse } from '@angular/common/http';
import { IEvents } from 'src/app/core/IEvents';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fade
  ]
})
export class HomeComponent implements OnInit {
  public events: Array<IEvents>;
  public isLoading: boolean = false;
  public displayedColumns: string[] = ['titulo', 'date'];

  public eventsToShow: IEvents;

  public currentDay: number = new Date().getDate();
  public currentMonth: number = new Date().getMonth();
  public currentYear: number = new Date().getFullYear();

  constructor(
    private _service: HomeService,
    private _toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.getAll();
    document.title = 'OrganizYou | Início';
  }

  public showDetails(event: any): void {
    this.eventsToShow = event;
  }

  public mobileList(): boolean {
    if (window.innerWidth < 960)
      return true;
    return false;
  }

  private getAll(): void {
    this.isLoading = true;
    this._service.GetAllEventsAsync().then((response: Array<IEvents>) => {
      this.isLoading = false;
      this.events = response;
    }).catch((error: HttpErrorResponse) => {
      this.isLoading = false;
      this._toastr.error(error.statusText, 'Não foi possível carregar os eventos.');
    });
  }
}

