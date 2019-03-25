import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {UserNotification} from '../models/UserNotification';
import {CustomResponse} from '../models/CustomResponse';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  constructor(private http: HttpClient) { }
  getNotifications(id): Observable<CustomResponse> {
    console.log(`${environment.API_URL}/notifications/`+id)
    return this.http.get<CustomResponse>(`${environment.API_URL}/notifications/`+id);
  }
}
