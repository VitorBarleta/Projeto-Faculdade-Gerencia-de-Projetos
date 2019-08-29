import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { IEvent } from 'src/app/core/IEvent';
import { reject } from 'q';
import { PageEvent } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _httpClient: HttpClient) { }

  private _url: string = 'http://localhost:3000/events';

  public async getAllEvents(paginatorEvent: PageEvent): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this._url, {
        params: new HttpParams()
        .append('pageSize', paginatorEvent.pageSize.toString())
        .append('pageIndex', paginatorEvent.pageIndex.toString())
      })
        .subscribe((response: Array<IEvent>) => {
          resolve(response);
        }, (error) => { reject(error) });
    }).catch((error: HttpErrorResponse) => {
      return reject(error);
    });
  }
}
