import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { IEvents } from 'src/app/core/IEvents';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _httpClient: HttpClient) { }

  url: string = 'http://localhost:3000/events';

  public async GetAllEventsAsync(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.url)
        .subscribe((response: Array<IEvents>) => {
          return resolve(response);
        }, reject);
    }).catch((error: HttpErrorResponse) => {
      return reject(error);
    });
  }
}
