import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CalendarService } from '../calendar.service';
import { DialogConfirmComponent } from '../../dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  public isLoading = false;
  public formNewEvent: FormGroup;
  public formEditEvent: Array<any> = [];
  public panelOpenState = false;
  public savedEvents: Array<any> = [];
  public smallScreen: boolean = window.innerWidth < 600 ? true : false;
  public fullDate = `${this.data.day} de ${this.data.monthFull} de ${this.data.year}`;

  constructor(private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data,
    private formBuilder: FormBuilder,
    private calendarService: CalendarService,
    private toastr: ToastrService
  ) {
    this.filterEvents(this.data.events);
  }

  ngOnInit() {
    this.formNewEvent = this.formBuilder.group({
      id: [],
      title: ['', [Validators.required]],
      startDay: [`${this.datePatterns(this.data.day)}/${this.datePatterns(this.data.month + 1)}/${this.data.year}`],
      startHour: [''],
      endDay: [''],
      endHour: [''],
      local: [''],
      description: [''],
      isActive: [false]
    });
    this.createFormEdit();
  }

  private createFormEdit(): void {
    for (let i = 0; i < this.savedEvents.length; i++) {
      this.formEditEvent[i] = new FormBuilder().group({
        id: [this.savedEvents[i].id],
        title: [this.savedEvents[i].title, [Validators.required]],
        startDay: [this.savedEvents[i].startDay],
        startHour: [this.savedEvents[i].startHour],
        endDay: [this.savedEvents[i].endDay],
        endHour: [this.savedEvents[i].endHour],
        local: [this.savedEvents[i].local],
        description: [this.savedEvents[i].description],
        isActive: [this.savedEvents[i].isActive]
      }
      );
    }
  }

  private filterEvents(event: Array<any>) {
    event.forEach(e => {
      if (e.endDay !== '')
        e.endDay = new Date(e.endDay);
      this.savedEvents.push(e);
    });
  }

  private datePatterns(date: number): string {
    if (date < 10) return `0${date}`;
    return `${date}`;
  }

  public saveEvent(event): void {
    this.isLoading = true;
    this.calendarService.post(event);
    this.isLoading = false;
  }

  public updateEvent(event): void {
    this.isLoading = true;
    this.calendarService.update(event);
    this.isLoading = false;
  }

  public deleteEvent(event): void {
    const dialogReference = this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: {
        title: event.title,
        type: 'o evento'
      }
    });

    dialogReference.afterClosed().subscribe(resp => {
      if (resp) {
        this.calendarService.delete(event.id).subscribe(() => {
          this.toastr.success('O evento foi excluído.');
          this.formEditEvent.splice(event, 1);
        },
          () => {
            this.toastr.error('Não foi possível excluir o evento. Tente novamente.');
          });
      }
    });
  }
}
