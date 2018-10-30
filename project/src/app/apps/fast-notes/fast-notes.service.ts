import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FastNotesService {

  private _baseUrl: string = 'http://192.168.100.4:3000/notes';

  constructor(private _http: HttpClient,
    private toastr: ToastrService) { }

  public getNotes(): Observable<any[]> {
    return this._http.get<any[]>(this._baseUrl);
  }

  public setNotes(notes: any): void {
    this._http.post(`${this._baseUrl}/`, notes).subscribe(() => {
      this.toastr.success('O evento foi salvo com sucesso!');
    },
      () => this.toastr.error('Não foi possível salvar o evento. Tente novamente.'));
  }

  public updateNotes(notes: any): void {
    this._http.put(`${this._baseUrl}/${notes.id}`, {
      "id": notes.id,
      "title": notes.title,
      "content": notes.content,
      "color": notes.color
    }).subscribe(() => {
      this.toastr.success('A anotação foi atualizada.');
    },
      () => {
        this.toastr.error('Não foi possível atualizar a anotação. Tente novamente.');
      }
    )
  }

  public deleteNotes(id: number): void{
    this._http.delete(`${this._baseUrl}/${id}`).subscribe(() => {
      this.toastr.success('A anotação foi deletada com sucesso.');
    },
    () => {
      this.toastr.error('Não foi possível excluir a anotação. Tente novamente.');
    })
  }
}
