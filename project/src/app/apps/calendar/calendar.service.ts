import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private _baseUrl = 'http://localhost:3000/' + /*id do user*/ 'events/';

  constructor(private _http: HttpClient,
    private toastr: ToastrService) { }

  public getAll(): Observable<any[]> {
    return this._http.get<any[]>(this._baseUrl);
  }

  public post(event: any) {

    this._http.post(`${this._baseUrl}`, event).subscribe(() => {
      this.toastr.success('O evento foi salvo com sucesso!');
    },
      () => this.toastr.error('Não foi possível salvar o evento. Tente novamente.'));
  }

  public delete(id: number): Observable<any> {
    return this._http.delete(`${this._baseUrl}${id}`);
  }

  public update(event: any): void {
    this._http.put(`${this._baseUrl}${event.id}`, {
      'id': event.id,
      'title': event.title,
      'startDay': event.startDay,
      'startHour': event.startHour,
      'endDay': event.endDay,
      'endHour': event.endHour,
      'local': event.local,
      'description': event.description,
      'isActive': event.isActive
    }).subscribe(() => {
      this.toastr.success('O evento foi alterado.');
    },
      () => {
        this.toastr.error('Não foi possível alterar o evento.');
      });
  }
}
