import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private _baseUrl = 'http://localhost:3000/' + /*id do user*/ 'events/';

  constructor(private _http: HttpClient) { }

  public getAll(): Observable<any[]> {
      return this._http.get<any[]>(this._baseUrl);
  }

  public getById(id: number): Observable<any> {
    try {
      return this._http.get(`${this._baseUrl}/${id}`);
    } catch{
      alert("Não foi possível buscar os dados.");
      return null;
    }
  }

  public post(event: any): boolean {
    try {
      this._http.post(this._baseUrl, event).subscribe(() => {
        alert("O evento foi salvo!");
        return true;
      });
    } catch{
      alert("Não foi possível salvar o evento. Tente novamente.");
      return false;
    }
  }

  public delete(id: number): boolean {
    try {
      this._http.delete(`${this._baseUrl}/${id}`).subscribe(() => {
        alert("O evento foi excluído.");
        return true;
      })
    } catch{
      alert("Não foi possível excluir o evento.");
      return false;
    }
  }

  public update(event: any): boolean {
    try{
      this._http.put(`${this._baseUrl}/${event.id}`, {
        "id": event.id,
        "title": event.title,
        "startDay": event.startDay,
        "startHour": event.startHour,
        "endDay": event.endDay,
        "endHour": event.endHour,
        "local": event.local,
        "description": event.description
      }).subscribe(() => {
        alert("O evento foi alterado.");
        return true;
      })
    }catch{
      alert("Não foi possível alterar o evento.");
      return false;
    }
  }
}
