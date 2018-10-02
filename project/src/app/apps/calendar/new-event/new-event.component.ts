import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  public form: FormGroup;

  constructor(private dialogRef: MatDialogRef<NewEventComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      date: [`${this.data.day} de ${this.data.monthFull} de ${this.data.year}`],
      title: ['', [Validators.required]],
      startDay: [`${this.datePatterns(this.data.day)}/${this.datePatterns(this.data.month + 1)}/${this.data.year}`],
      startHour: [''],
      endDay: ['', ],
      endHour: [''],
      local: [''],
      description: ['']
    })
  }

  private datePatterns(date: number): string {
    if (date < 10) return `0${date}`;
    return `${date}`;
  }
}
