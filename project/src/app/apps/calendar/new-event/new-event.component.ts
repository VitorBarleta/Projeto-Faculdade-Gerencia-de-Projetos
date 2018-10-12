import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  public isLoading: boolean = true;

  public formNewEvent: FormGroup;

  public formEditEvent: Array<FormGroup>;

  public panelOpenState = false;

  public savedEvents: Array<any> = [];

  public fullDate: string = `${this.data.day} de ${this.data.monthFull} de ${this.data.year}`

  constructor(private dialogRef: MatDialogRef<NewEventComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private formBuilder: FormBuilder
  ) {
    this.filterEvents(this.data.events);
  }

  ngOnInit() {
    this.formNewEvent = this.formBuilder.group({
      id: [this.savedEvents.length],
      title: ['', [Validators.required]],
      startDay: [`${this.datePatterns(this.data.day)}/${this.datePatterns(this.data.month + 1)}/${this.data.year}`],
      startHour: [''],
      endDay: ['',],
      endHour: [''],
      local: [''],
      description: [''],
      canceled: [false]
    });
  }

  private filterEvents(event: Array<any>){
    event.forEach(e => {
      this.savedEvents.push(e);
    })
  }

  public toDate(day: string): Date{
    let arr: Array<string> = day.split('/').reverse();
    return new Date(parseInt(arr[0]), parseInt(arr[1]) - 1, parseInt(arr[2]));
  }

  private datePatterns(date: number): string {
    if (date < 10) return `0${date}`;
    return `${date}`;
    //this.isLoading = false;
  }
}
