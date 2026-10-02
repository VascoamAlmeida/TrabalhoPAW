import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const endpoint = 'http://localhost:3000/api/v1/vales/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ValesRestServiceService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get(endpoint, httpOptions);
  }

  create(vale: any): Observable<any> {
    return this.http.post(endpoint, vale, httpOptions);
  }

  getVale(id: string): Observable<any> {
    return this.http.get(endpoint + id, httpOptions);
  }

}
