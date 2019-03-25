import { Component, OnInit } from '@angular/core';
import {User} from '../shared/models/User';
import {AuthService} from '../shared/services/auth-service.service';
import {Router} from '@angular/router';

// @ts-ignore
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  err = false;


  constructor(
    private as: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  onSubmit(value) {
    this.as.login(value as User)
      .subscribe(res => {
        console.log(res.success)
        console.log(res.payload)
        if (res.success) {



          sessionStorage.setItem('user', res.payload.id);
        sessionStorage.setItem('role', res.payload.profile.role);
     this.router.navigate(['home']);
        } else {
          this.err = true;
        }
      });
  }

  onRegister() {
    this.router.navigate(['register']);
  }

  updateErr() {
    if (this.err) {
      this.err = false;
    }
  }

  onForgot() {
    this.router.navigate(['resetRequest']);
  }
}


