import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/User';
import { UsersRestServiceService } from './users-rest-service.service';
import { EntidadesRestServiceService } from './entidades-rest-service.service';
import { EntidadeModel } from '../models/Entidade';

const endpoint = 'http://localhost:3000/api/v1/auth/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthRestServiceService {
  private currentUserSubject = new BehaviorSubject<UserModel | undefined>(undefined);
  private currentEntidadeSubject = new BehaviorSubject<EntidadeModel | undefined>(undefined);

  currentUser = this.currentUserSubject.asObservable();
  currentEntidade = this.currentEntidadeSubject.asObservable();

  constructor(private http: HttpClient, private userService: UsersRestServiceService, private entidadeService: EntidadesRestServiceService) { }

  

  login(email: string, password:string): Observable<AuthRestModelResponse>{
    return this.http.post<AuthRestModelResponse>(endpoint + "login", new LoginModel(email, password), { ...httpOptions, withCredentials: true });
  }

  loginEntidade(email: string, password:string): Observable<AuthRestEntModelResponse>{
    return this.http.post<AuthRestEntModelResponse>(endpoint + "login-entidade", new LoginModel(email, password));
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    this.currentUserSubject.next(undefined);
    this.currentEntidadeSubject.next(undefined);
  }

  register(name: string, email: string, password: string) :  Observable<AuthRestModelResponse>{
    const registerObservable = this.http.post<any>(endpoint+"register", new RegisterModel( name, email, password));
    return registerObservable;
  }

  registerEntidade(name: string, email: string, password: string, localizacao: string) : Observable<any>{
    return this.http.post<any>(endpoint + "register-entidade", { name, email, password, localizacao });
  }

}

export interface AuthRestModelResponse{
  auth: boolean;
  token: string;
  role: string;
  _id: string;
}
export interface AuthRestEntModelResponse{
  auth: boolean;
  token: string;
  _id: string;
}

export class LoginModel{
  constructor(public email:string, public password:string){}
}

export class RegisterModel{
  constructor(public name:string, public email:string, public password:string){}
}