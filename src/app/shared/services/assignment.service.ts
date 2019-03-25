import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomResponse} from '../models/CustomResponse';
import {environment} from '../../../environments/environment';
import {Submission} from '../models/Submission';
import {Assignment} from '../models/Assignment';
import {CustomFile} from '../models/CustomFile';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) { }
  getAssignments(): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${environment.API_URL}/assignments`);
  }

    getStudentSubmissions(id): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${environment.API_URL}/submissions/assignment/studentSubmissions/` +id);
  }

  getSingleAssignments(id): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${environment.API_URL}/assignments/`+id);
  }

  getAllsubmissions(): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${environment.API_URL}/submissions`);
  }
  downloadSingleSubmission(id):Observable<Blob> {

    // @ts-ignore
    return this.http.get<Blob>(`${environment.API_URL}/submissions/`+id,{responseType: "blob"});
  }

  downloadSingleSubmissionFileDetail(id):Observable<CustomResponse> {

    // @ts-ignore
    return this.http.get<CustomResponse>(`${environment.API_URL}/submissions/fileDeatil/`+id);
  }

  editAssignment(a:Assignment):Observable<CustomResponse> {

    // @ts-ignore
    return this.http.put<CustomResponse>(`${environment.API_URL}/assignments`,a);
  }

  addAssignment(a:Assignment):Observable<CustomResponse> {

    // @ts-ignore
    return this.http.post<CustomResponse>(`${environment.API_URL}/assignments`,a);
  }


  downloadAssignmentSubmissionZip(id):Observable<Blob> {

    // @ts-ignore
    return this.http.get<Blob>(`${environment.API_URL}/submissions/assignment/`+id,{responseType: "blob"});
  }

  getAllStudents(): Observable<CustomResponse>{
    return this.http.get<CustomResponse>(`${environment.API_URL}/users`);
  }

  deleteAssignment(id:number): Observable<CustomResponse>{
    return this.http.delete<CustomResponse>(`${environment.API_URL}/assignments/`+id);
  }

  gradeAssignment(sub : Submission): Observable<CustomResponse>{
    return this.http.post<CustomResponse>(`${environment.API_URL}/submissions/grade`,sub);
  }

  submitAssignment(file:File, id:number) {
    const formData: FormData = new FormData();

    formData.append('file', file,file.name);


    const s = "{" +
      " \"studentId\": "+ sessionStorage.getItem("user") + ",\n" +
      "      \"assignmentId\":"+id +
      "}"

    formData.append('submission', s);

    const req = new HttpRequest('POST' ,`${environment.API_URL}/submissions`,formData );
    console.log(formData);

   return this.http.request(req);

  }

  uploadFile(file: File){
    const formData: FormData = new FormData();

    formData.append('file', file,file.name);


    const s = "{" +
      " \"studentId\": "+ sessionStorage.getItem("user") + ",\n" +
      "      \"assignmentId\":"+-1 +
      "}"

    formData.append('submission', s);

    const req = new HttpRequest('POST' ,`${environment.API_URL}/submissions/uploads`,formData );
    console.log(formData);

    return this.http.request(req);
  }

  getFiles(): Observable<CustomResponse>{
    return this.http.get<CustomResponse>(`${environment.API_URL}/submissions/uploads`);
  }

 downloadFile(id:number): Observable<Blob>{
   // @ts-ignore
   return this.http.get<Blob>(`${environment.API_URL}/files/`+id,{responseType: "blob"});
  }
}
