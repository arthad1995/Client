import {Component, NgModule, OnInit} from '@angular/core';
import {NotificationServiceService} from '../shared/services/notification-service.service';
import {UserNotification} from '../shared/models/UserNotification';
import {AssignmentService} from '../shared/services/assignment.service';
import {Assignment} from '../shared/models/Assignment';
import {AssignmentEditComponent} from '../assignment-edit/assignment-edit.component';
import {FileManageComponent} from '../file-manage/file-manage.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';



// @ts-ignore
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})


export class HomepageComponent implements OnInit {

  isAdmin: boolean;
  notifications: UserNotification[];
  assignments : Assignment[];
  constructor(
    private ns : NotificationServiceService,
    private as : AssignmentService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.ns.getNotifications(sessionStorage.getItem('user')).subscribe((res) => {
      this.notifications = res.payload;
      this.as.getAssignments().subscribe((res) => {
        this.assignments = res.payload;


        this.notifications =this.notifications.sort(function(a, b) {
          let d1 = new Date(a.time);
          let d2 = new Date(b.time);
          return d1>d2 ? -1 : a<b ? 1 : 0;
        }).slice(0,10);


        this.assignments =this.assignments.sort(function(a, b) {
           let d1 = new Date(a.duedate);
          let d2 = new Date(b.duedate);
          return d1>d2 ? -1 : a<b ? 1 : 0;
        });

      });
      this.isAdmin = sessionStorage.getItem('role')==='instructor'
    });

  }

  onUpload() {
    let dialogRef = this.dialog.open(FileManageComponent, {
      height: '200px',
      width: '400px',
    });
  }

  onLogout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  onPeople() {
    this.router.navigate(['people']);
  }

  onEdit() {
    this.router.navigate(['editProfile']);
  }
}
