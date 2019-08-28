import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IEvent } from 'src/app/core/IEvent';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _httpClient: HttpClient) { }

  private _url: string = 'http://localhost:3000/events';

  public async GetAllEventsAsync(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this._url)
        .subscribe((response: Array<IEvent>) => {
          return resolve(response);
        }, reject);
    }).catch((error: HttpErrorResponse) => {
      return reject(error);
    });
  }
}
