import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080'; // Adjust the URL as needed

  constructor(private http: HttpClient, private router: Router) {

  }

  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken; // Return true if an access token exists, false otherwise
  }

  login(credentials: any): Observable<any> {
    // return this.http.post<any>(this.apiUrl + "/auth/login", credentials)
    return this.http.post<any>(this.apiUrl + "/auth/login", credentials, { withCredentials: true })
      .pipe(
        tap((response: any) => {
          if (response.message == "Password change required") {
            // Redirect to password change page
            // Replace 'change-password' with your actual route
            window.location.href = '/change-password';
          }
        })
      );
  }

  // Save the accessToken to localStorage
  saveAccessToken(accessToken: string): void {
    sessionStorage.setItem('accessToken', accessToken);
  }

  // Retrieve the accessToken from localStorage
  getAccessToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }

  // Clear the accessToken from localStorage on logout
  clearAccessToken(): void {
    sessionStorage.removeItem('accessToken');
  }

  changePassword(userId: number, newPassword: string): Observable<any> {
    const url = `${this.apiUrl}/auth/change-password`;
    const requestBody = { userId, newPassword };

    return this.http.post(url, requestBody);
  }

  updateUserLoginCount(userId: number, newLoginCount: number): Observable<any> {
    const url = `${this.apiUrl}/auth/update-login-count`; // Replace with your actual endpoint
    const params = { userId: userId.toString(), newLoginCount: newLoginCount.toString() };

    return this.http.put(url, null, { params });
  }

  // logout(): Observable<any> {
  //   return this.http.post(this.apiUrl + '/auth/logout', {}, { responseType: 'text' }); // Specify 'text' as responseType
  // }

  // logout(): Observable<any> {
  //   const username = 'admin'; // Modify this based on how you extract the username from the token
  //   return this.http.post(this.apiUrl + '/auth/logout', { username }, { responseType: 'text' });
  // }

  logout(): Observable<any> {
    const token = localStorage.getItem('auth_token'); // Get the token from your storage (localStorage, sessionStorage, etc.)
    const username = 'admin'; // Modify this based on how you extract the username from the token

    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.post(`${this.apiUrl}/auth/logout`, { username }, { headers, responseType: 'text' });
  }
}
