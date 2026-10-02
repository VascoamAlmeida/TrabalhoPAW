import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/User';


const endpoint = 'http://localhost:3000/api/v1/users/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class UsersRestServiceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(endpoint, httpOptions);
  }

  create(user: any): Observable<any> {
    return this.http.post(endpoint, user, httpOptions);
  }

  get(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(endpoint + id, httpOptions);
  }

  update(id: string, user: any): Observable<any> {
    return this.http.put(endpoint + id, user, httpOptions);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(endpoint + id, httpOptions);
  }

  buyVale(data: {userId: string, valeId: string}): Observable<any> {
    return this.http.post(endpoint + 'buy-vale', { valeId: data.valeId }, httpOptions);
  }

  getVales(id: string): Observable<any> {
    return this.http.get(endpoint + id + '/vales', httpOptions);
  }

  
  
}