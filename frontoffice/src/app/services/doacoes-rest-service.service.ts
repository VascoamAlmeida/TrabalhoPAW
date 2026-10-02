import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const endpoint = 'http://localhost:3000/api/v1/doacoes/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DoacoesRestServiceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(endpoint, httpOptions);
  }

  getByUser(idUser: string): Observable<any> {
    return this.http.get(`${endpoint}user/${idUser}`, httpOptions);
  }

  getByEntidade(idEntidade: string): Observable<any> {
    return this.http.get(`${endpoint}entidade/${idEntidade}`, httpOptions);
  }

  create(doacao: any): Observable<any> {
    return this.http.post(endpoint, doacao, httpOptions);
  }

  get(id: string): Observable<any> {
    return this.http.get(endpoint + id, httpOptions);
  }

  update(id: string, doacao: any): Observable<any> {
    return this.http.put(endpoint + id, doacao, httpOptions);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(endpoint + id, httpOptions);
  }

  aceitar(id: string): Observable<any> {
    return this.http.put(`${endpoint}${id}/aceitar`, {}, httpOptions);
  }

  cancelar(id: string): Observable<any> {
    return this.http.put(`${endpoint}${id}/cancelar`, {}, httpOptions);
  }

  concluir(id: string): Observable<any> {
    return this.http.put(`${endpoint}${id}/concluir`, {}, httpOptions);
  }

  verifyNewDonations(): Observable<any> {
    return this.http.get(endpoint + 'newDonations', httpOptions);
  }
}