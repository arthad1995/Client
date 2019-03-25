import { Component, OnInit } from '@angular/core';
import {FileManageComponent} from '../file-manage/file-manage.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-drawer-container',
  templateUrl: './drawer-container.component.html',
  styleUrls: ['./drawer-container.component.scss']
})
export class DrawerContainerComponent implements OnInit {
  isAdmin: boolean;
  showFiller = false;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.isAdmin = sessionStorage.getItem('role')==='instructor'
  }

  onUpload() {
    let dialogRef = this.dialog.open(FileManageComponent, {
      height: '200px',
      width: '400px',
    });
  }
}
