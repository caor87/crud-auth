import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../../service/token/token.service";
import {AuthService} from "../../../service/auth/auth.service";
import {Router} from "@angular/router";
import {LoginUser} from "../../../model/login-user/login-user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUser: LoginUser = {
    userName: '',
    password: ''
  };
  userName: string = '';
  password: string = '';
  roles: string[] = [];
  errMsj: string = ''

  constructor(private tokenService: TokenService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log('Ingresoooooo')
    if(this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUser = new LoginUser(this.userName, this.password);
    this.authService.loginUser(this.loginUser).subscribe(
      data => {
        this.isLogged = true;
        this.isLoginFail = false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.userName);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
      }, error => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errMsj = error.error.message;
        console.log(this.errMsj);
      }
    );
  }

}
