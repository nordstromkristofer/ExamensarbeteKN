import { tap, mapTo } from 'rxjs/operators';
import { Interceptor } from './Interceptor';
import { User } from './models/user';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

const AccessTokenKey = 'AccessToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject$: BehaviorSubject<User> = new BehaviorSubject<User>(null!);

  User$: Observable<User> = this.userSubject$.asObservable();

  constructor(private apiService: ApiService,
    private router: Router) {
    const tokens = {
      accessToken: this.getAccessToken()
    };
    if (tokens.accessToken) {
      this.setUser(tokens.accessToken);
    }
  }

  login(user: { username: string | null, password: string | null }): Observable<boolean> {
    return this.apiService.post<any>('user', user, null, null!, Interceptor.All)
      .pipe(
        tap(tokens => {

          this.setUser(tokens.value.accessToken)
        }),
        mapTo(true),
      );
  }

  logout() {
    this.logoutUser();
  }

  getAccessToken(): any {
    return sessionStorage.getItem(AccessTokenKey);
  }

  isAuthenticated(): boolean {
    // Add your authentication logic here
    // For example, check if the user has a valid access token
    return !!this.getAccessToken();
  }

  private setAccessToken(token?: string) {
    if (token) {
      sessionStorage.setItem(AccessTokenKey, token);
    } else {
      sessionStorage.removeItem(AccessTokenKey);
    }
  }

  private setUser(tokens) {
    const user = User.fromJwtToken(tokens);
    this.userSubject$.next(user);

    this.setAccessToken(tokens);
  }

  private logoutUser() {
    this.userSubject$.next(null!);
    this.setAccessToken(null!);
  }
}
