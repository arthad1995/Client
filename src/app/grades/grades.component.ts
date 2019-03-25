import { Component, OnInit } from '@angular/core';
import {AssignmentService} from '../shared/services/assignment.service';
import {Assignment} from '../shared/models/Assignment';
import {Submission} from '../shared/models/Submission';
import {User} from '../shared/models/User';
import {DomSanitizer} from '@angular/platform-browser';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {
  assignments : Assignment[];
  // submissions : Submission[];
  fileUrl;
  // users : User[];
  // scores : [any[]];

  constructor(private as:AssignmentService,  private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.as.getAssignments().subscribe( res =>{
     this.assignments= res.payload
      // this.assignments.sort((a,b)=>a.id-b.id);
      //   this.as.getAllStudents().subscribe( res =>{
      //     this.users = res.payload;
      //
      //
      //     this.scores = [[]];
      //
      //
      //
      //         this.users.sort((a,b)=>a.id-b.id);
      //
      //         for(let u of this.users){
      //
      //
      //             this.as.getStudentSubmissions(u.id).subscribe(res=>{
      //               this.submissions = res.payload;
      //                 this.submissions.sort((a,b)=>a.assignmentId-b.assignmentId);
      //
      //               let submission = new Submission();
      //               submission.score = 0;
      //                 // @ts-ignore
      //                 let arr = [this.assignments.length].fill(0);
      //
      //              //   arr.push(u.name);
      //               for(let s of this.submissions){
      //
      //               // @ts-ignore
      //                 arr.push(s);
      //
      //
      //               }
      //               arr.shift()
      //                 this.scores.push(arr);
      //             }
      //             )
      //
      //
      //         }
      //
      //
      //
      //     console.log(this.scores)
      //   })

      })


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
