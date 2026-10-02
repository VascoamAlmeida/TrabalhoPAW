import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const endpoint = 'http://localhost:3000/api/v1/entidades/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EntidadesRestServiceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(endpoint, httpOptions);
  }

  get(id: string): Observable<any> {
    return this.http.get(endpoint + id, httpOptions);
  }

  create(entidade: any): Observable<any> {
    return this.http.post(endpoint, entidade, httpOptions);
  }

  update(id: string, entidade: any): Observable<any> {
    return this.http.put(endpoint + id, entidade, httpOptions);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(endpoint + id, httpOptions);
  }

  searchEntidades(searchOptions: any): Observable<any> {
    return this.http.post(endpoint + 'search', searchOptions, httpOptions);
  }




}

