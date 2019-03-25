import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BoardOverviewComponent} from '../board-overview/board-overview.component';
import {dialogData} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-confirm-assignment-dialog',
  templateUrl: './confirm-assignment-dialog.component.html',
  styleUrls: ['./confirm-assignment-dialog.component.scss']
})
export class ConfirmAssignmentDialogComponent implements OnInit {
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
