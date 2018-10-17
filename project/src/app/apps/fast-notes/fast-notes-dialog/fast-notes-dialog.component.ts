import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FastNotesService } from '../fast-notes.service';

@Component({
  selector: 'app-fast-notes-dialog',
  templateUrl: './fast-notes-dialog.component.html',
  styleUrls: ['./fast-notes-dialog.component.css']
})
export class FastNotesDialogComponent implements OnInit {

  public DialogForm: FormGroup;

  public isUpdating: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) private data,
  private service: FastNotesService) { }

  ngOnInit() {
    if(this.data == null){
      this.generateNewForm();
      this.isUpdating = false;
    }else{
      this.generateEditForm();
      this.isUpdating = true;
    }
  }

  public generateNewForm(): void{
    this.DialogForm = new FormBuilder().group({
      id: [],
      title: [],
      content: []
    })
  }

  public generateEditForm(): void{
    this.DialogForm = new FormBuilder().group({
      id: [this.data.id],
      title: [this.data.title],
      content: [this.data.content]
    })
  }

  public post(notes): void {
    this.service.setNotes(notes);
    this.isUpdating = true;
  }

  public update(notes): void {
    this.service.updateNotes(notes);
  }

}
