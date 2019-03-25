import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {User} from '../models/User';
import {CustomResponse} from '../models/CustomResponse';
import {Profile} from '../models/Profile';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_API_URL = `${environment.API_URL}`;

  userSubject: Subject<User> = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient
  ) {

  }


  login(user: User): Observable<CustomResponse> {
    // const httpParams: HttpParams = new HttpParams()
    //   .append('username', user.username)
    //   .append('password', user.password);

    let object = {
      'username' : user.username,
      'password' : user.password
    }
    return this.http.post<CustomResponse>(`${this.AUTH_API_URL}/users/login`, object, {withCredentials: true})
      // .pipe(
      //   map((res: CustomResponse) => {
      //     console.log(res.sucess)
      //     this.userSubject.next(res.payload);
      //
      //     return res;
      //   })
      ;
  }

  register(user: User): Observable<{success: boolean}> {
    let profile = new Profile();
    profile.id = 1;
    user.profile = profile;
    return this.http.post<{success: boolean, user: User}>(`${this.AUTH_API_URL}/users/register`, user);
  }



  logout(): Observable<{success: boolean}> {
    return this.http.post<{success: boolean}>(`${this.AUTH_API_URL}/logout`, null, {withCredentials: true});
  }


  editUser(u:User): Observable< CustomResponse> {
    return this.http.put< CustomResponse>(`${this.AUTH_API_URL}/users`, u);
  }

  getUser(id:number): Observable< CustomResponse> {
    return this.http.get<CustomResponse>(`${this.AUTH_API_URL}/users/id/`+id);
  }

  resetPasswordRequest(name:string): Observable< CustomResponse> {
    return this.http.post<CustomResponse>(`${this.AUTH_API_URL}/users/resetRequest/`+name,null);
  }

  resetPassword(user:User): Observable< CustomResponse> {
    return this.http.put<CustomResponse>(`${this.AUTH_API_URL}/users/reset`+name,user);
  }


  private handleError(error: HttpErrorResponse) {
    return throwError(`${error.error}`);
  }
}
