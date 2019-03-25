import { Component, OnInit } from '@angular/core';
import {AssignmentService} from '../shared/services/assignment.service';
import {User} from '../shared/models/User';
import {Sort} from '@angular/material';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  isAdmin: boolean;
  users: User[];
  displayedColumns: string[] = ['id','name','profile','username','email'];
  displayedColumns2: string[] = ['name','profile'];
  constructor(private as : AssignmentService) { }

  ngOnInit() {
    this.as.getAllStudents().subscribe(res=>{
      this.users = res.payload;
    })
    this.isAdmin = sessionStorage.getItem('role')==='instructor'
  }

}

