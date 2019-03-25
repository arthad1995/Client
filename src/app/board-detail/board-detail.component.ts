import { Component, OnInit } from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {BoardService} from '../shared/services/board.service';
import {Board} from '../shared/models/Board';
import {Reply} from '../shared/models/Reply';
import {MatDialog} from '@angular/material';
import {BoardCreateDialogComponent} from '../board-create-dialog/board-create-dialog.component';
import {ReplyDialogComponent} from '../reply-dialog/reply-dialog.component';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.scss']
})
export class BoardDetailComponent implements OnInit {
  board:Board;
  replies:Reply[]
  isAdmin: boolean;
  currentUserId:number;
  constructor(   private router: ActivatedRoute,
                 private bs: BoardService,
                 public dialog: MatDialog) { }

  ngOnInit() {
    this.currentUserId = parseInt(sessionStorage.getItem('user'));
    this.isAdmin = sessionStorage.getItem('role')==='instructor'
    this.router.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        const id = +paramMap.get('id');
        return this.bs.getSingleBoard(id);
      })
    ).subscribe((res) => {

      this.board = res.payload;

      this.bs.getUserName(this.board.posterId).subscribe(res=>{
        this.board.uname = res.payload.name;
        console.log(this.board)
      })



      this.bs.getBoardReplies(this.board.id).subscribe(res=>{
        this.replies = res.payload;

        for(let r of this.replies){
          this.bs.getUserName(r.senderId).subscribe(res=>{
            r.uname = res.payload.name;
          })
        }


      //  this.replies.sort((val)=> {return new Date(val.time)})

        this.replies = this.replies.sort((val1, val2)=> {
          return new Date(val1.time) > new Date(val2.time) ? 1 : -1
        })
        console.log(this.replies)
        // this.replies = this.replies.sort(function(a,b){
        //   // Turn your strings into dates, and then subtract them
        //   // to get a value that is either negative, positive, or zero.
        //   return new Date(b.time) - new Date(a.time);
        // })
      })

    });

  }

  onCreate() {
    const dialogRef = this.dialog.open(ReplyDialogComponent,{
      width:"400px",
      height:"300px",
      data:{
        boardId:this.board.id
      }
    });
    dialogRef.afterClosed().subscribe(res =>{

        this.bs.getBoardReplies(this.board.id).subscribe(res2=>{
          this.replies=res2.payload;




          for(let r of this.replies){
            this.bs.getUserName(r.senderId).subscribe(res=>{
              r.uname = res.payload.name;
            })
          }


          //  this.replies.sort((val)=> {return new Date(val.time)})

          this.replies = this.replies.sort((val1, val2)=> {
            return new Date(val1.time) > new Date(val2.time) ? 1 : -1
          })


        })
      }
    )

  }

  onDelete(id:number) {


    this.bs.deleteReply(id).subscribe(res2=>{

      if(res2.success){
        this.bs.getBoardReplies(this.board.id).subscribe(res3=>{

          this.replies=res3.payload;
          for(let r of this.replies){
            this.bs.getUserName(r.senderId).subscribe(res=>{
              r.uname = res.payload.name;
            })
          }
          this.replies = this.replies.sort((val1, val2)=> {
            return new Date(val1.time) > new Date(val2.time) ? 1 : -1
          })


        })

    }})


  }

  replyTo(id:number) {
    const dialogRef = this.dialog.open(ReplyDialogComponent,{
      width:"400px",
      height:"300px",
      data:{
        boardId:this.board.id,
        replyToUserId:id
      }
    });
    dialogRef.afterClosed().subscribe(res =>{

      this.bs.getBoardReplies(this.board.id).subscribe(res2=>{
        this.replies=res2.payload;




        for(let r of this.replies){
          this.bs.getUserName(r.senderId).subscribe(res=>{
            r.uname = res.payload.name;
          })
        }


        //  this.replies.sort((val)=> {return new Date(val.time)})

        this.replies = this.replies.sort((val1, val2)=> {
          return new Date(val1.time) > new Date(val2.time) ? 1 : -1
        })

  })
})
  }
}

