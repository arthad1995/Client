import { Component, OnInit } from '@angular/core';
import {Assignment} from '../shared/models/Assignment';
import {Submission} from '../shared/models/Submission';
import {AssignmentDeatil} from '../shared/models/AssignmentDeatil';
import {AssignmentService} from '../shared/services/assignment.service';
import {AuthService} from '../shared/services/auth-service.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {User} from '../shared/models/User';
import {DomSanitizer} from '@angular/platform-browser';
import { saveAs } from 'file-saver';

class TableInfo {
  tittle:string;
  id:number;
  submmsionId:number;
  score:any;
}

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.scss']
})
export class PeopleDetailComponent implements OnInit {

  average:number;
  studentname:string;
  fileUrl;
  student : User;
  assignments : Assignment[];
  info:TableInfo[];
  submissions : Submission[];
  displayedColumns: string[] = ['tittle','score','download'];
  assignmentDetails : AssignmentDeatil[];
  isAdmin: boolean;
  constructor( private router: ActivatedRoute,
    private as : AssignmentService,
                  private us : AuthService,
               private sanitizer: DomSanitizer) { }






  public initializeData()
  {


    this.router.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        const id = +paramMap.get('id');
        return this.us.getUser(id);
      })
    ).subscribe(res=>{
      this.student = res.payload;
      this.studentname = res.payload.name;

      this.as.getAssignments().subscribe(res=>{
        this.assignments = res.payload;
        this.as.getStudentSubmissions(this.student.id).subscribe(  res=>{
          this.submissions = res.payload;



          console.log(this.submissions);
          if(this.submissions) {

            for (let a of this.assignments) {
              let ass = new AssignmentDeatil();
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
            console.log(this.assignmentDetails);
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
              if(a.submission){
                i.score = a.submission.score;
                i.submmsionId=a.submission.id;
              }


              this.info.push(i)
            }

            this.average=total/count;



          }
        });
      });


    })





  }

  ngOnInit() {

    this.isAdmin = sessionStorage.getItem('role')==='instructor'
    this.assignmentDetails  = [];
    this.initializeData();

  }


  onDownload(submmsionId: number) {
    this.as.downloadSingleSubmission(submmsionId).subscribe( response =>{
      this.as.downloadSingleSubmissionFileDetail(submmsionId).subscribe(
        res=>{
          var contentDispositionHeader = response;
          console.log(contentDispositionHeader);

          console.log(res)
          const blob = new Blob([response], { type: 'application/octet-stream' });
          this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
          saveAs(blob,res.payload.name+"."+res.payload.type)
        }


      )

    });
  }
}
