import { Component, OnInit } from '@angular/core';
import { FastNotesService } from './fast-notes.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FastNotesDialogComponent } from './fast-notes-dialog/fast-notes-dialog.component';
import { fade } from 'src/app/app.animations';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

const COLORS: string[] = ['255, 0, 0', '255, 165, 0', '255, 255, 0',
  '0, 255, 0', '128, 0, 128', '0, 128, 128'];

@Component({
  selector: 'app-fast-notes',
  templateUrl: './fast-notes.component.html',
  styleUrls: ['./fast-notes.component.css'],
  animations: [
    fade
  ]
})
export class FastNotesComponent implements OnInit {

  public formEditNotes: Array<FormGroup> = [];
  public isLoading = true;
  private isSaving = false;

  constructor(private dialog: MatDialog,
    private service: FastNotesService,
    private toastr: ToastrService) { }

  ngOnInit() {
    document.title = 'OrganizYou | Anotações';
    this.get();
  }
  
  public addNote(): void {
    const dialogRef = this.dialog.open(FastNotesDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.get();
    });
  }

  public convertColor(color: any): string {
    return 'rgba(' + parseInt(color.slice(-6, -4), 16) + ',' + parseInt(color.slice(-4, -2), 16) + ',' + parseInt(color.slice(-2), 16) + ',' + '0.2' + ')';
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
    this.isLoading = true;
    this.service.getNotes().subscribe(response => {
      this.generateFormEdit(response);
    },
      () => {
        this.isLoading = false;
        this.toastr.error('Não foi possível buscar as anotações. Tente novamente.');
      });
  }

  private generateFormEdit(data: Array<any>) {
    for (let i = 0; i < data.length; i++) {
      this.formEditNotes[i] = new FormBuilder().group({
        id: [data[i].id],
        title: [data[i].title],
        content: [data[i].content],
        color: [data[i].color]
      });
    }
    this.isLoading = false;
  }

  public delete(notes): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
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
