import {Component, Inject, OnInit} from '@angular/core';

import {HttpClient, HttpEvent, HttpHeaderResponse, HttpRequest, HttpResponse} from '@angular/common/http';
import {FileUploader} from 'ng2-file-upload';
import {environment} from '../../environments/environment';
import {$} from 'protractor';
import {AssignmentService} from '../shared/services/assignment.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AssignmentManagementComponent} from '../assignment-management/assignment-management.component';
import {DialogData} from '../assignment-edit/assignment-edit.component';
import {HomepageComponent} from '../homepage/homepage.component';


@Component({
  selector: 'app-file-manage',
  templateUrl: './file-manage.component.html',
  styleUrls: ['./file-manage.component.scss']
})
export class FileManageComponent implements OnInit {
  file:File;
  constructor(    public dialogRef: MatDialogRef<HomepageComponent>,
                  @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private  as: AssignmentService) {
  }


  ngOnInit(): void {



  }

  onChange(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.file = fileInput.target.files[0];
    }
  }

  onSubmission() {
    this.as.uploadFile(this.file).subscribe(res=>{


      if(res instanceof  HttpResponse && res.statusText==='OK'){
        this.dialogRef.close()
      }


    });
    this.file=null;
  }
}


