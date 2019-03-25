import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {BoardOverviewComponent} from '../board-overview/board-overview.component';

export interface dialogData {
b:boolean
}


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  b:boolean;
  constructor(public dialogRef: MatDialogRef<BoardOverviewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: dialogData) { }

  ngOnInit() {

  }

  onNoClick() {
    this.b =false;
    this.dialogRef.close(0);
  }

  onYesClick() {
    this.b = true;
    this.dialogRef.close(1);
  }
}
