import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NewUser} from "../../model/new-user/new-user";
import {Observable} from "rxjs";
import {JwtDto} from "../../model/jwt-dto/jwt-dto";
import {LoginUser} from "../../model/login-user/login-user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL= 'http://localhost:8080/auth/'
  constructor(private httpClient: HttpClient) { }

  public newUser(newUser: NewUser): Observable<any> {
    return this.httpClient.post(this.authURL + 'new', newUser);
  }

  public loginUser(logingUser: LoginUser): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.authURL + 'login', logingUser);
  }
}
