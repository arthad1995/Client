import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AssignmentManagementComponent} from '../assignment-management/assignment-management.component';
import {AssignmentService} from '../shared/services/assignment.service';
import {Assignment} from '../shared/models/Assignment';
export interface DialogData {
  id: number;
  duedate: Date;
  tittle: string;
  description: string;

}

@Component({
  selector: 'app-assignment-edit',
  templateUrl: './assignment-edit.component.html',
  styleUrls: ['./assignment-edit.component.scss']
})
export class AssignmentEditComponent implements OnInit {
  description:string;
  tittle:string;
  id:number;
  duedate:Date;
  constructor(
    public dialogRef: MatDialogRef<AssignmentManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private as : AssignmentService,
  ) {}

  ngOnInit() {

    if(this.data) {
      this.description = this.data.description;
      this.tittle = this.data.tittle;
      this.duedate = this.data.duedate;
      this.id = this.data.id;

    }
  }

  submit(value) {
    console.log(value)
    if(this.data){
      let a = new Assignment();
      a.tittle = value.tittle;
      a.duedate = new Date(new Date(value.duedate.toString()+'z:-0400'));
      a.description = value.description
      a.posterId = parseInt(sessionStorage.getItem('user'));
      console.log(this.id)
      a.id = this.id;

      this.as.editAssignment(a).subscribe(res=>{
        if(res.success){
          this.dialogRef.close();

        }

        else{
          console.log('failed')
        }
      })


    }
    else{
    let a = new Assignment();
    a.tittle = value.tittle;
    a.duedate = new Date(new Date(value.duedate.toString()+'z:-0400'));
    a.description = value.description
    a.posterId = parseInt(sessionStorage.getItem('user'));

    this.as.addAssignment(a).subscribe(res=>{
      if(res.success)
      this.dialogRef.close();
      else{
        console.log('failed')
      }
    });
  }
  }
}
