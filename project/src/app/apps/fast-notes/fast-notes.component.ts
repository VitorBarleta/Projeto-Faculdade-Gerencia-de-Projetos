import { Component, OnInit } from '@angular/core';
import { FastNotesService } from './fast-notes.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../apps.component';
import { FastNotesDialogComponent } from './fast-notes-dialog/fast-notes-dialog.component';

const COLORS: string[] = ['255, 0, 0', '255, 165, 0', '255, 255, 0',
  '0, 255, 0', '128, 0, 128', '0, 128, 128'];

@Component({
  selector: 'app-fast-notes',
  templateUrl: './fast-notes.component.html',
  styleUrls: ['./fast-notes.component.css']
})
export class FastNotesComponent implements OnInit {

  public formEditNotes: Array<FormGroup> = [];
  public isLoading = true;
  private isSaving = false;

  constructor(private dialog: MatDialog,
    private service: FastNotesService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.get();
  }

  public removeNote(): void {
    console.log(this.formEditNotes[this.formEditNotes.length - 1].get('content').value)
    if (this.formEditNotes[this.formEditNotes.length - 1].get('title').value === '' &&
      this.formEditNotes[this.formEditNotes.length - 1].get('content').value === '') {
      this.formEditNotes.splice(this.formEditNotes.length - 1, 1);
      this.isSaving = false;
    }
    else if (this.isSaving) {
      this.service.setNotes(this.formEditNotes[this.formEditNotes.length - 1].value);
      this.isSaving = false;
    }
  }

  // public addNote(): void {
  //   this.formEditNotes.push(new FormBuilder().group({
  //     id: [this.formEditNotes.length],
  //     title: ['', Validators.required],
  //     content: ['', Validators.required]
  //   }));
  //   this.isSaving = true;
  // }

  public addNote(): void {
    const dialogRef = this.dialog.open(FastNotesDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.get();
    });
  }

  public updateNote(form: any): void {
    const dialogRef = this.dialog.open(FastNotesDialogComponent, {
      width: '500px',
      data: form
    });

    dialogRef.afterClosed().subscribe(() => {
      this.get();
    });
  }

  public get(): void {
    this.service.getNotes().subscribe(response => {
      this.generateFormEdit(response);
    },
      () => {
        this.isLoading = false;
        this.toastr.error('Não foi possível pegar as anotações. Tente novamente.');
      });
  }

  private generateFormEdit(data: Array<any>) {
    for (let i = 0; i < data.length; i++) {
      this.formEditNotes[i] = new FormBuilder().group({
        id: [data[i].id],
        title: [data[i].title, [Validators.required]],
        content: [data[i].content, [Validators.required]]
      });
    }
    this.isLoading = false;
  }

  public delete(notes): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: {
        title: notes.title,
        type: 'a anotação'
      }
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.formEditNotes.splice(notes.id, 1);
        this.service.deleteNotes(notes.id);
      }
    });
  }

}
