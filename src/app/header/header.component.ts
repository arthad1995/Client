import {Component, NgModule, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isAdmin: boolean;
  constructor(   private router: Router) { }

  ngOnInit() {
    this.isAdmin = sessionStorage.getItem('role')==='instructor'
  }

  onClickLogout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
  onEdit() {
    this.router.navigate(['editProfile']);
  }
}
