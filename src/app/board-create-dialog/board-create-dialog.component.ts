import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AssignmentManagementComponent} from '../assignment-management/assignment-management.component';
import {AssignmentService} from '../shared/services/assignment.service';

import {BoardOverviewComponent} from '../board-overview/board-overview.component';
import {BoardService} from '../shared/services/board.service';
import {Assignment} from '../shared/models/Assignment';
import {Board} from '../shared/models/Board';

export interface BoardDialogData {
  id?:number;
  content:string;
  tittle:string;
  posterId:number;
  uname:string;

}

@Component({
  selector: 'app-board-create-dialog',
  templateUrl: './board-create-dialog.component.html',
  styleUrls: ['./board-create-dialog.component.scss']
})
export class BoardCreateDialogComponent implements OnInit {
  id?:number;
  content:string;
  tittle:string;
  posterId:number;
  uname:string;
  constructor(

    public dialogRef: MatDialogRef<BoardOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BoardDialogData,
    private bs: BoardService,
  ) { }

  ngOnInit() {
    if(this.data) {
      this.content = this.data.content;
      this.tittle = this.data.tittle;
      this.uname = this.data.uname;
      this.id = this.data.id;
      this.posterId = this.data.posterId;
    }
  }


  submit(value) {
    if(this.data){
      let b = new Board();
      b.tittle = value.tittle;

      b.content = value.content
      b.posterId = parseInt(sessionStorage.getItem('user'));

      b.id = this.id;

      this.bs.editBoard(b).subscribe(res=>{
        if(res.success){

          this.dialogRef.close('success');

        }

        else{
          console.log('failed')
        }
      })


    }
    else{
      let b = new Board();
      b.tittle = value.tittle;

      b.content = value.content
      b.posterId = parseInt(sessionStorage.getItem('user'));
      this.bs.addBoard(b).subscribe(res=>{
        if(res.success)
          this.dialogRef.close();
        else{
          console.log('failed')
        }
      });
    }
  }
}
