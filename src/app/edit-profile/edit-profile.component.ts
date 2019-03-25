import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/auth-service.service';
import {User} from '../shared/models/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user :User;
  password:string;
  email:string;
  name:string;
  isAdmin: boolean;
  constructor(private  as:AuthService, private router: Router) { }

  ngOnInit() {
    this.isAdmin = sessionStorage.getItem('role')==='instructor'
    this.as.getUser(parseInt(sessionStorage.getItem('user'))).subscribe(res=>{
      this.user = res.payload;
      this.email = this.user.email;
      this.name = this.user.name;
    })
  }


  submit(value) {
      if(value.name){
        this.user.name=value.name;
      }

      if(value.password){
        this.user.password=value.password
      }
      if(value.email){
        this.user.email = value.email;
      }

      this.as.editUser(this.user).subscribe(res=>{
        if(res.success)
          this.router.navigate(['home'])
      })
  }
}
