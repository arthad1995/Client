import { Component, OnInit } from '@angular/core';
import {AssignmentService} from '../shared/services/assignment.service';
import {CustomFile} from '../shared/models/CustomFile';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import {Router} from '@angular/router';
import {FileManageComponent} from '../file-manage/file-manage.component';

@Component({
  selector: 'app-public-file-download',
  templateUrl: './public-file-download.component.html',
  styleUrls: ['./public-file-download.component.scss']
})
export class PublicFileDownloadComponent implements OnInit {
  fileUrl;

  files : CustomFile[];
  displayedColumns: string[] = ['fileName','post date','actions'];
  isAdmin: boolean;
  constructor(private as:AssignmentService,
              private sanitizer: DomSanitizer,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.isAdmin = sessionStorage.getItem('role')==='instructor'
    this.as.getFiles().subscribe(res=>{
      this.files = res.payload;
      new MatTableDataSource(res.payload);
    })
  }


  onDownload(row: CustomFile) {
    this.as.downloadFile(row.id).subscribe( response =>{

      var contentDispositionHeader = response;
      console.log(contentDispositionHeader);


      const blob = new Blob([response], { type: 'application/octet-stream' });
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      saveAs(blob,row.name+"."+row.type)
    });

  }

  onCreate() {
    let dialogRef = this.dialog.open(FileManageComponent, {
      height: '200px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.as.getFiles().subscribe(res=>{
        this.files = res.payload;
        new MatTableDataSource(res.payload);
      })
    })
  }
}
