import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../model/user";
import {AuthService} from "../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = "http://localhost:8080/getUsers";
  url2: string = "http://localhost:8080/user/update/";
  private createUserBE = "http://localhost:8080/users/save";

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  userList$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  /*userList:User[] = [
    new User(1, 'user1', 'user_email1@yahoo.com', '1234'),
    new User(2, 'user2', 'user_email2@yahoo.com', '1234'),
    new User(3, 'user3', 'user_email3@yahoo.com', '1234')
  ]*/

  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
        tap(users => this.userList$.next(users))
    );
  }

  getUsers(): Observable<User[]> {
    return this.userList$.asObservable();
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.createUserBE}`, user).pipe(
      catchError((error) => {
        let errorMessage = 'An error occurred';
        if (error instanceof HttpErrorResponse) {
          if (error.status === 500) {
            errorMessage = 'Duplicate entry. This user already exists.';
          } else {
            errorMessage = `HTTP Error: ${error.status}`;
          }
        }
        return throwError(errorMessage);
      })
    );

  }

}
