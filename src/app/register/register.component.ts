import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth-service.service';
import {Router} from '@angular/router';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  err = false;
  registerFormGroup: FormGroup;

 emailPattern = "^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{1,15}$";
 // emailPattern = "^\\w";
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerFormGroup = this.fb.group({
      username: '',
      name:'',
      email:'',
      passwordGroup: this.fb.group({
        password: '',

        confirm_password: ''
      }, {validator: this.passwordValidator})
    },
    );


  }

  onSubmit() {
    if (this.registerFormGroup.valid) {
      const {email,username,name, passwordGroup, passwordGroup: {password}} = this.registerFormGroup.value;
      this.authService.register({username, password,email,name})
        .subscribe(res => {
          if (res.success) {
            this.router.navigate(['login']);
          } else {
            this.err = true;
          }
        }, (err) => { // error handling
          this.err = true;
        });
    } else {
      return false;
    }
  }
  passwordValidator({value}: FormGroup) {
    const {password, confirm_password} = value;
    return password === confirm_password ? null : {passwordGroup: 'Passwords don\'t match!'};
  }

}
