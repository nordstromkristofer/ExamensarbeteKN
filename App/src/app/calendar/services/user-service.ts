import { ApiService } from './../../core/api.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './service-interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private usersUrl = 'http://localhost:3000/users';
  private postUrl = 'http://localhost:3000/1'; // mockURL

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private apiservice: ApiService, private http: HttpClient,) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  getUsersByTeam(selectedTeam): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  getUserByUsername(username: string): Observable<User> {
    return this.getUsers().pipe(
      map(users => users.find(user => user.member === username))
    );

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}




