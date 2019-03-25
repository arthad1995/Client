import { Component, OnInit } from '@angular/core';
import {Board} from '../shared/models/Board';
import {BoardService} from '../shared/services/board.service';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {BoardCreateDialogComponent} from '../board-create-dialog/board-create-dialog.component';


@Component({
  selector: 'app-board-overview',
  templateUrl: './board-overview.component.html',
  styleUrls: ['./board-overview.component.scss']
})
export class BoardOverviewComponent implements OnInit {
  boards:Board[];
  b:boolean;
  displayedColumns: string[] = ['tittle','poster','actions'];
  id:number;
  isAdmin: boolean;
  constructor(private bs: BoardService,public dialog: MatDialog) { }

  ngOnInit() {
    this.isAdmin = sessionStorage.getItem('role')==='instructor'
    this.b = false;
    this.bs.getBoards().subscribe(res=>{
      this.id = parseInt(sessionStorage.getItem('user'));
      this.boards = res.payload;

      for(let b of this.boards){
       this.bs.getUserName(b.posterId).subscribe(rest=>{

          b.uname = rest.payload.name;
        })
      }
    })

  }

  onEdit(row: Board) {
    const dialogRef = this.dialog.open(BoardCreateDialogComponent, {
      width:"600px",
      height:"500px",
      data:{
        content : row.content,
        tittle:row.tittle,
        posterid:row.posterId,
        id:row.id
      }
    });
    dialogRef.afterClosed().subscribe(res =>{

        this.bs.getBoards().subscribe(res2=>{
          this.boards=res2.payload;
          for(let b of this.boards){
            this.bs.getUserName(b.posterId).subscribe(rest=>{

              b.uname = rest.payload.name;
            })
          }
        })
      }
    )
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {


    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){

        this.bs.deleteBoard(id).subscribe(res=>{

            this.bs.getBoards().subscribe(res2=>{
              this.boards=res2.payload;
              for(let b of this.boards){
                this.bs.getUserName(b.posterId).subscribe(rest=>{

                  b.uname = rest.payload.name;
                })
              }

            })

        });
      }
    });
  }

  onCreate() {
    const dialogRef = this.dialog.open(BoardCreateDialogComponent, {
      width:"600px",
      height:"500px",
    });
    dialogRef.afterClosed().subscribe(res =>{



        this.bs.getBoards().subscribe(res2=>{
          this.boards=res2.payload;
          for(let b of this.boards){
            this.bs.getUserName(b.posterId).subscribe(rest=>{

              b.uname = rest.payload.name;
            })
          }

        })



    })
  }
}
