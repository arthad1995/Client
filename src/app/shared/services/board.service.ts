import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomResponse} from '../models/CustomResponse';
import {environment} from '../../../environments/environment';
import {Board} from '../models/Board';
import {Reply} from '../models/Reply';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  getBoards(): Observable<CustomResponse>{
    return this.http.get<CustomResponse>(`${environment.API_URL}/boards`);
  }

  getUserName(id:number): Observable<CustomResponse>{

    return this.http.get<CustomResponse>(`${environment.API_URL}/users/id/`+id);
  }

  deleteBoard(id:number) :Observable<CustomResponse>{
    console.log(`${environment.API_URL}/boards/`+id);
    return this.http.delete<CustomResponse>(`${environment.API_URL}/boards/`+id);
  }

  editBoard(b: Board)  :Observable<CustomResponse>{
    return this.http.put<CustomResponse>(`${environment.API_URL}/boards`,b);
  }

  addBoard(b: Board)  :Observable<CustomResponse>{
    return this.http.post<CustomResponse>(`${environment.API_URL}/boards`,b);
  }
  getBoardReplies(id:number)  :Observable<CustomResponse>{
    return this.http.get<CustomResponse>(`${environment.API_URL}/replys/`+id);
  }
  getSingleBoard(id:number)  :Observable<CustomResponse>{
    return this.http.get<CustomResponse>(`${environment.API_URL}/boards/`+id);
  }

  postReply(reply:Reply)  :Observable<CustomResponse>{
    return this.http.post<CustomResponse>(`${environment.API_URL}/replys`,reply);
  }

  editReply(reply:Reply)  :Observable<CustomResponse>{
    return this.http.put<CustomResponse>(`${environment.API_URL}/replys`,reply);
  }

  deleteReply(id:number)  :Observable<CustomResponse>{
    return this.http.delete<CustomResponse>(`${environment.API_URL}/replys/`+id);
  }

}
