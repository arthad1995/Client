import { Component, OnInit } from '@angular/core';
import {AssignmentService} from '../shared/services/assignment.service';
import {Assignment} from '../shared/models/Assignment';
import {Submission} from '../shared/models/Submission';
import {AssignmentDeatil} from '../shared/models/AssignmentDeatil';
import {AuthService} from '../shared/services/auth-service.service';



class TableInfo {
  tittle:string;
  id:number;
  score:any;
}

@Component({
  selector: 'app-submission-overview',
  templateUrl: './submission-overview.component.html',
  styleUrls: ['./submission-overview.component.scss']
})
export class SubmissionOverviewComponent implements OnInit {
  average:number;
  studentname:string;
  assignments : Assignment[];
  info:TableInfo[];
  submissions : Submission[];
  displayedColumns: string[] = ['tittle','score'];
  assignmentDetails : AssignmentDeatil[];
  isAdmin: boolean;
  constructor(    private as : AssignmentService,
                  private us : AuthService) { }






  public initializeData()
  {
    this.as.getAssignments().subscribe(res=>{
  this.assignments = res.payload;
  this.as.getStudentSubmissions(sessionStorage.getItem('user')).subscribe(  res=>{
  this.submissions = res.payload;



  console.log(this.submissions)
  if(this.submissions) {

    for (let a of this.assignments) {
      let ass = new AssignmentDeatil()
      ass.assignment=a;
      this.assignmentDetails.push(ass);
    }

    for (let a of this.assignmentDetails) {
      for (let s of this.submissions) {
        if (s.assignmentId == a.assignment.id) {
          a.submission = s;
        }

      }
    }
    console.log(this.assignmentDetails)
    this.info = [];

    let count = 0;
    let total = 0;
    for (let a of this.assignmentDetails) {

      if(a.submission){
        if(a.submission.score){
          count++
          total = total + a.submission.score;
        }
      }

      let i = new TableInfo();
      i.id=a.assignment.id;
      i.tittle = a.assignment.tittle;
      if(a.submission)
      i.score = a.submission.score;

      this.info.push(i)
    }

   this.average=total/count;
    this.us.getUser(parseInt(sessionStorage.getItem('user'))).subscribe(res=>{
      this.studentname = res.payload.name
    })


}
});
});
}

   ngOnInit() {
     this.isAdmin = sessionStorage.getItem('role')==='instructor'
    this.assignmentDetails  = [];
     this.initializeData();

  }





}
