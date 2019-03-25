import { Component, OnInit } from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AssignmentService} from '../shared/services/assignment.service';
import {User} from '../shared/models/User';
import {Submission} from '../shared/models/Submission';
import {SnA} from '../shared/models/SnA';

@Component({
  selector: 'app-grade-assignment',
  templateUrl: './grade-assignment.component.html',
  styleUrls: ['./grade-assignment.component.scss']
})
export class GradeAssignmentComponent implements OnInit {
  id:number;
  users : User[];
  sna : SnA[];
  submissions : Submission[];
  isAdmin: boolean;
  constructor(
    private router: ActivatedRoute,
    private as : AssignmentService
  ) { }

  ngOnInit() {
    this.isAdmin = sessionStorage.getItem('role')==='instructor'
    this.router.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
         this.id = +paramMap.get('id');
        return this.as.getAllStudents();
      })
    ).subscribe(res => {
      this.users = res.payload;
      this.as.getAllsubmissions().subscribe(res =>{
        this.submissions = res.payload;
        this.submissions =this.submissions.filter( e=>{

          return e.assignmentId==this.id;
        })

        console.log(this.submissions)
        this.sna = [];
        for(let u of this.users){
          let s = new Submission();
          let sa = new SnA();

          for(let ss of this.submissions){

            if(u.id==ss.studentId){

              s = ss;

            }
          }
          sa.submissiong = s;


          sa.user = u;
          sa.graded=false;
          this.sna.push(sa);
        }

      })


    })

  }


  keyDownFunction(event,sub) {
    if(event.keyCode == 13) {
      console.log(sub)
      sub.score = event.target.value;
      sub.graderId = parseInt(sessionStorage.getItem('user'));
        this.as.gradeAssignment(sub).subscribe(res=>{
          console.log(res.success)
          for(let i in this.sna){
            if(this.sna[i].submissiong.id==sub.id){
              this.sna[i].graded = true;
            }
          }
        });

    }
  }
}
