import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';


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
  constructor(private http: HttpClient,
              private CookieService: CookieService) { }

  isUserLoggedIn(): boolean {
    return this.CookieService.check('tken');
  }

  logout() {
    this.CookieService.delete('tken');
  }

  registerUser(user: User) {
    return this.http.post(this._registerUrl, user, this.options).pipe(catchError(this.handleError));
  }

  loginUser(user: User) {
    return this.http.post(this._loginUrl, user, this.options).pipe(catchError(this.handleError));
  }

  handleError(errorRes: HttpErrorResponse) {
    let msg: string;
    if (errorRes.status === 400 && errorRes.error) {
      msg = errorRes.error;
    } else {
      msg = "Somthing went wrong! Try again !";
    }
    return throwError(msg);
  }
}