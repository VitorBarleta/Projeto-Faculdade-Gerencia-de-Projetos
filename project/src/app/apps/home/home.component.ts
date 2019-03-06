import { Component, OnInit } from '@angular/core';
import { MatDialogTitle, MatTableDataSource, Sort } from '@angular/material';
import { HomeService } from './home.service';
import { fade } from 'src/app/app.animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fade
  ]
})
export class HomeComponent implements OnInit {
  public events: any;
  public isLoading: boolean = false;
  public displayedColumns: string[] = ['titulo', 'data'];

  public eventsToShow: any;

  public currentDay = new Date().getDate();
  public currentMonth = new Date().getMonth();
  public currentYear = new Date().getFullYear();

  constructor(private service: HomeService,
    private toastr: ToastrService) {
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
    this.service.get().subscribe(response => {
      response.forEach(event => {
        if (event.endDay != '')
          event.endDay = new Date(event.endDay).toLocaleDateString();
      });
      this.isLoading = false;
      this.events = response;
    }, () => {
      this.isLoading = false;
      this.toastr.error('Não foi possível buscar os dados. Tente novamente.');
    });
  }

  sortData(sort: Sort) {
    const data = this.events.slice();

    this.events = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'date': return compare(a.startDay, b.startDay, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

