import { Component, OnInit } from '@angular/core';
import {Assignment} from '../shared/models/Assignment';
import {AssignmentService} from '../shared/services/assignment.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Submission} from '../shared/models/Submission';
import { saveAs } from 'file-saver';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.scss']
})
export class AssignmentDetailComponent implements OnInit {
  file:File;
  fileUrl;
  assignment: Assignment;
  submissions : Submission[];
  passed : boolean;
  fileId : number = 0;
   isAdmin: boolean;
  constructor(
    private router: ActivatedRoute,
    private as: AssignmentService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.isAdmin = sessionStorage.getItem('role')==='instructor'
    this.router.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        const id = +paramMap.get('id');
        return this.as.getSingleAssignments(id);
      })
    ).subscribe((res) => {

      this.assignment = res.payload;
      this.passed = new Date(this.assignment.duedate.toString()) < new Date();


      this.as.getStudentSubmissions(sessionStorage.getItem('user')).subscribe( res =>{

        this.submissions = res.payload;
        for(let sub of this.submissions){
        //  console.log(sub.assignmentId + "            ====================   " + this.assignment.id)
          if(sub.assignmentId==this.assignment.id){
            this.fileId = sub.id;
            console.log(this.fileId)
          }
        }

      })
    });
  }


  onChange(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.file = fileInput.target.files[0];
    }
  }

  onSubmission() {
    this.as.submitAssignment(this.file,this.assignment.id).subscribe(res=>{
      this.file=null;
      this.as.getStudentSubmissions(sessionStorage.getItem('user')).subscribe( res =>{

        this.submissions = res.payload;
        for(let sub of this.submissions){
          //  console.log(sub.assignmentId + "            ====================   " + this.assignment.id)
          if(sub.assignmentId==this.assignment.id){
            this.fileId = sub.id;
            console.log(this.fileId)
          }
        }

      })

    });


  }

  onDownload() {
    //this.as.downloadSingleSubmission(this.fileId).subscribe();
    this.as.downloadSingleSubmission(this.fileId).subscribe( response =>{
      this.as.downloadSingleSubmissionFileDetail(this.fileId).subscribe(
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
