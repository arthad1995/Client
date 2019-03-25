import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BoardOverviewComponent} from '../board-overview/board-overview.component';
import {BoardService} from '../shared/services/board.service';
import {BoardDialogData} from '../board-create-dialog/board-create-dialog.component';
import {BoardDetailComponent} from '../board-detail/board-detail.component';
import {Reply} from '../shared/models/Reply';
export interface ReplyDialogData {
  id:number;
  content:string;
  senderId:number;
  boardId:number;
  replyToUserId:number;
  time:Date;
  uname:string;

}
@Component({
  selector: 'app-reply-dialog',
  templateUrl: './reply-dialog.component.html',
  styleUrls: ['./reply-dialog.component.scss']
})
export class ReplyDialogComponent implements OnInit {
  id:number;
  content:string;
  senderId:number;
  boardId:number;
  replyToUserId:number;
  time:Date;
  uname:string;

  constructor(

    public dialogRef: MatDialogRef<BoardDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReplyDialogData,
    private bs: BoardService,
  ) { }

  ngOnInit() {

    if(this.data) {
      this.content = this.data.content;
      this.senderId = this.data.senderId;
      this.uname = this.data.uname;
      this.id = this.data.id;
      this.boardId = this.data.boardId;
      this.replyToUserId = this.data.replyToUserId;
      this.time = this.data.time;
      this.uname=this.data.uname;
    }

  }

  submit(value) {
if(!this.data.id){
  console.log(this.data.replyToUserId)
  let r = new Reply();
  r.content = value.content;
  r.senderId = parseInt(sessionStorage.getItem('user'));
  r.boardId = this.data.boardId;
  if(this.data.replyToUserId){
    this.bs.getUserName(this.replyToUserId).subscribe(res=>{
      r.content = '@' + res.payload.name+"  "+value.content;

      r.replyToUserId = this.data.replyToUserId;
      console.log(r)
      this.bs.postReply(r).subscribe(res=>{
        if(res.success)
          this.dialogRef.close();
      })

    })

  }
else {
  this.bs.postReply(r).subscribe(res=>{
    if(res.success)
      this.dialogRef.close();
  })
  }

}
else{
  let r = this.data;
  r.content = value.content;
}

  }
}
