import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CustomSandwichPayload } from './custom-sandwich';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SandwichService {

  public httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Content-Type':  'application/json'
    })
  };

  public GET_ALL_SANDWICHES_URL = 'http://localhost:3000/api/v1/sandwich/all';
  public GET_SANDWICH_PRICE = 'http://localhost:3000/api/v1/sandwich/';

  constructor(private http: HttpClient) { }

  public getSandwichList(inflation: number = 1.0): Observable<any> {
    return this.http.post(this.GET_ALL_SANDWICHES_URL, {inflation}, this.httpOptions);
  }

  public getSandwichPrice(content: CustomSandwichPayload, inflation: number = 1.0, ): any {
    const body = {
      inflation,
      content
    };
    return this.http.post(this.GET_SANDWICH_PRICE, body, this.httpOptions);
  }
}
