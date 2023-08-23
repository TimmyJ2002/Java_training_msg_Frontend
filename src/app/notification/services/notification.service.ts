import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notification} from "../models/notification";
import {User} from "../../user/model/user";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8080/notifications/for_me';
  private putUrl = "http://localhost:8080/notifications/update/";
  constructor(private http: HttpClient) { }


  getNotifications(): Observable<Notification[]>{
    return this.http.get<Notification[]>(`${this.apiUrl}`);
  }

  markNotificationAsRead(id: number, notification: Partial<Notification>): Observable<any> {
    return this.http.put(`${this.putUrl}${id}`, notification);
  }

  /*
  updateUser(id: number, user: Partial<User>): Observable<any> {
    return this.http.put(`${this.apiUrl2}${id}`, user);
  }
  */
}
