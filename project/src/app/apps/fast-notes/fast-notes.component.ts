import { Component, OnInit } from '@angular/core';
import { FastNotesService } from './fast-notes.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-fast-notes',
  templateUrl: './fast-notes.component.html',
  styleUrls: ['./fast-notes.component.css']
})
export class FastNotesComponent implements OnInit {

  public formEditNotes: Array<FormGroup> = [];
  public isLoading = true;

  constructor(private service: FastNotesService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.get();
  }

  public removeNote(): void{
    console.log('foi');
    this.formEditNotes.splice(this.formEditNotes.length, 1);
  }

  public addNotes(): void{
    this.formEditNotes.push(new FormBuilder().group({
      id: [this.formEditNotes.length],
      title: ['', Validators.required],
      content: ['', Validators.required]
    }));
  }

  public get(): void{
    this.service.getNotes().subscribe(response => {
      this.generateFormEdit(response);
    },
    () => {
      this.toastr.error('Não foi possível pegar as anotações. Tente novamente.');
    });
  }

  private generateFormEdit(data: Array<any>){
    for(let i = 0; i < data.length; i++){
      this.formEditNotes[i] = new FormBuilder().group({
        id: [data[i].id],
        title: [data[i].title, [Validators.required]],
        content: [data[i].content, [Validators.required]]
      });
    }
    this.isLoading = false;
  }

  public post(notes): void{
    this.service.setNotes(notes);
  }

  public update(notes): void{
    this.service.updateNotes(notes);
  }

  public delete(id: number): void{
    this.formEditNotes.splice(id, 1);
    this.service.deleteNotes(id);
  }

}
