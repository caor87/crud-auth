import {Component, OnInit} from '@angular/core';
import {NewUser} from "../../../model/new-user/new-user";
import {TokenService} from "../../../service/token/token.service";
import {AuthService} from "../../../service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  newUser: NewUser | any;
  name: string | any;
  userName: string | any;
  email: string | any;
  password: string | any;
  errMsj: string | any;
  isLogged = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }
  onRegister(): void {
    this.newUser = new NewUser(this.name, this.userName, this.email, this.password, ['admin']);
    console.log('NUEVO USUARIO', this.newUser);
    this.authService.newUser(this.newUser).subscribe(
      data => {
        console.log()
        this.router.navigate(['/register']);
      },
      err => {
        this.errMsj = err.error.mensaje;

         console.error(err.error);
      }
    );
  }



}
