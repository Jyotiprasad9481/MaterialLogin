import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface User {
  id?: number;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('token', 'loginToken');
          return true;
        }
        return false;
      })
    );
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
