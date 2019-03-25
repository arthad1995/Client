import { Component, OnInit } from '@angular/core';
import {UserNotification} from '../shared/models/UserNotification';
import {NotificationServiceService} from '../shared/services/notification-service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: UserNotification[];
  isAdmin: boolean;
  constructor(    private ns : NotificationServiceService,) { }

  ngOnInit() {
    this.isAdmin = sessionStorage.getItem('role')==='instructor'
    this.ns.getNotifications(sessionStorage.getItem('user')).subscribe((res) => {
      this.notifications = res.payload;
    });
  }

}
