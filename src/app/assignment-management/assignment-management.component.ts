import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AssignmentService} from '../shared/services/assignment.service';
import {Assignment} from '../shared/models/Assignment';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {AssignmentEditComponent} from '../assignment-edit/assignment-edit.component';
import {DomSanitizer} from '@angular/platform-browser';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-assignment-management',
  templateUrl: './assignment-management.component.html',
  styleUrls: ['./assignment-management.component.scss']
})
export class AssignmentManagementComponent implements OnInit {
  assignments: Assignment[];
  fileUrl;
  displayedColumns: string[] = ['tittle','duedate','actions'];
  isAdmin: boolean;

  constructor(    private as : AssignmentService,public dialog: MatDialog,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.isAdmin = sessionStorage.getItem('role')==='instructor'
    this.as.getAssignments().subscribe( res=>{
     //  this.assignments= res.payload
      // @ts-ignore
      this.assignments = new MatTableDataSource(res.payload);
    })

  }

  onEdit(row: Assignment) {

    let dialogRef = this.dialog.open(AssignmentEditComponent, {

      data: {
        description : row.description,
        tittle:row.tittle,
        duedate:row.duedate,
        id:row.id
      },

      height: '800px',
      width: '600px',
    })

this.dialog.afterAllClosed.subscribe(()=>{this.as.getAssignments().subscribe(res=>this.assignments = res.payload)}
)
  }

  onDelete(id: number) {

    let dialogRef = this.dialog.open(AssignmentEditComponent, {

    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.as.deleteAssignment(id).subscribe(res=>{
          if(res.success){
            this.as.getAssignments().subscribe(res=>this.assignments = res.payload);
          }
        })
      }
    })

  }

  onCreate() {
    let dialogRef = this.dialog.open(AssignmentEditComponent, {
      height: '800px',
      width: '600px',
    });
    this.dialog.afterAllClosed.subscribe(()=>{this.as.getAssignments().subscribe(res=>this.assignments = res.payload)});
  }

  downloadSubmissions(id: number) {
    this.as.downloadAssignmentSubmissionZip(id).subscribe( response =>{

      console.log(response.size)


      const blob = new Blob([response], { type: 'application/octet-stream' });
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      saveAs(blob,"assignment " + id+".zip")
    });
  }


}
