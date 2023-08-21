import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../model/user";
import {AuthService} from "../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = "http://localhost:8080/users/find_all";
  apiUrl2: string = "http://localhost:8080/users/update/";
  private createUserBE = "http://localhost:8080/users/save";

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.createUserBE}`, user).pipe(
      catchError((error) => {
        let errorMessage = 'An error occurred';
        if (error instanceof HttpErrorResponse) {
          if (error.status === 400) {
            errorMessage = 'Duplicate entry. This user already exists.';
          } else {
            errorMessage = `HTTP Error: ${error.status}`;
          }
        }
        return throwError(errorMessage);
      })
    );

  }

  updateUser(id: number | undefined, user: Partial<User>): Observable<any> {
    return this.http.put(`${this.apiUrl2}${user.id}`, user);
  }

}
