import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

export interface User {
  id?: number;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }


  login(email: string, password: string) {
		return this.http.post<any>(this.apiUrl + 'api/user_login', {
			username: email,
			password: password
		}).pipe(catchError(this.handleError), tap(resData => {
			if (resData.data) {
				localStorage.setItem('status', resData.status);
				localStorage.setItem('userDettoken', resData.data.userDettoken);
				localStorage.setItem('userDet', JSON.stringify(resData.data.userDet));
				localStorage.setItem('menuDet', JSON.stringify(resData.data.menuDet));
				localStorage.setItem('links', resData.data.links);
			}
		}));
	}
	handleError(errorRes: HttpErrorResponse) {
		if (!errorRes.error || !errorRes.error.error) {
			return throwError(errorRes);
		}
		let errorMessage = 'An Unknown error Occured..';
		errorMessage = errorRes.error.error.message;
		return throwError(errorMessage);
	}
  register(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      switchMap(users => {
        const maxId = users.reduce((max, user) => Math.max(max, user.id || 0), 0);
        const newUser: User = {
          id: maxId + 1,
          email,
          password
        };
        return this.http.post<User>(`${this.apiUrl}/users`, newUser);
      })
    );
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      map(users => users.some(user => user.email === email))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

}
