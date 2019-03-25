import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.scss']
})
export class ResetPasswordRequestComponent implements OnInit {

  constructor(private as:AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(value: any) {
    console.log(value.username);
    this.as.resetPasswordRequest(value.username).subscribe(
res=>{
  if(res.success){
    this.router.navigate(['login']);
  }

}
    )

  }
}
