import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';


export interface User {
  name?: String,
  email: String,
  password: String,
  phoneno?: String,
  gender?: String
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = "http://localhost:8080/api/register";
  private _loginUrl = "http://localhost:8080/api/login";
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    return this.http.post(this._registerUrl, user, this.options);
  }

  loginUser(user: User) {
    return this.http.post(this._loginUrl, user, this.options);
  }
}