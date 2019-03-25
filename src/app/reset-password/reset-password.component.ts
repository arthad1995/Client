import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../shared/services/auth-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../shared/models/User';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  err = false;
  registerFormGroup: FormGroup;
  constructor(  private authService: AuthService,
                private fb: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private router: Router) { }

  ngOnInit() {
    this.registerFormGroup = this.fb.group({

        passwordGroup: this.fb.group({
          password: '',

          confirm_password: ''
        }, {validator: this.passwordValidator})
      },
    );
  }

  passwordValidator({value}: FormGroup) {
    const {password, confirm_password} = value;
    return password === confirm_password ? null : {passwordGroup: 'Passwords don\'t match!'};
  }

  onSubmit(value) {
      let u = new User();
      console.log(this.activatedRoute.snapshot.url[1].path)
      u.username = this.activatedRoute.snapshot.url[1].path;
      u.password = value.password;
      console.log(u);
      this.authService.resetPassword(u).subscribe(
        res=>{
          if(res.success){
            this.router.navigate(['login'])
          }
        }
      )
     // console.log(this.activatedRoute.snapshot.url[1].path);



  }
}
