import { SkipInterceptorService } from './skip-interceptor.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { Interceptor } from './Interceptor';
import SkippableHttpInterceptor from './skippable-http-interceptor';

@Injectable()
export class TokenInterceptor extends SkippableHttpInterceptor {

    protected get Id() {
        return Interceptor.Token;
    }

    //private isRefreshing = false;
    //private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(public authService: AuthService, protected skipInterceptorService: SkipInterceptorService) {
        super(skipInterceptorService);
    }

    

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const skipped = super.intercept(request, next);

        if (skipped) {
            return skipped;
        }

        if (this.authService.getAccessToken()) {
            request = this.addToken(request, this.authService.getAccessToken());
        }

        return next.handle(request).pipe(catchError(error => {
      
            return throwError(error);
        }));
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    /*
    private prependRefreshTokenRequest(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshAccessToken().pipe(
                switchMap(accessToken => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(accessToken);
                    return next.handle(this.addToken(request, accessToken));
                }));
        }

        return this.refreshTokenSubject.pipe(
            filter(token => !!token),
            take(1),
            switchMap(jwt => {
                return next.handle(this.addToken(request, jwt));
            }));
    }
    */
}
