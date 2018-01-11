import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Data } from './../data.interface';

@Injectable()
export class WebService {

  constructor(private http: HttpClient) { }

  getData(): Observable<Data> {
    return this.http.get<Data>('http://192.168.4.1/data');
  }
}
