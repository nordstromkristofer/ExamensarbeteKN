import { SkipInterceptorService } from './skip-interceptor.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import SkippableHttpInterceptor from './skippable-http-interceptor';
import { Interceptor } from './Interceptor';

const defaultErrorMessage = 'Oops, something went wrong! Please check the logs and try again later.';
const default401Message = 'You are not authorized to access this resource.';

@Injectable()
export class HttpErrorInterceptor extends SkippableHttpInterceptor {

    protected get Id(): Interceptor {
        return Interceptor.Error;
    }

    constructor(private snackBar: MatSnackBar, protected skipInterceptorService: SkipInterceptorService) {
        super(skipInterceptorService);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const intercepted = super.intercept(request, next);

        if (intercepted) {
            return intercepted;
        }

        return next.handle(request).pipe(
            catchError((errorResponse: HttpErrorResponse) => {
                let message: string;

                if (errorResponse.error instanceof ErrorEvent) {
                    message = errorResponse.error.message;
                } else {
                    message = this.getServerErrorMessage(errorResponse);
                }

                this.snackBar.open(message || defaultErrorMessage, 'Close', {
                    duration: 4000
                });

                return throwError(errorResponse);
            })
        );
    }

    private getServerErrorMessage(errorResponse: HttpErrorResponse) {
        if (errorResponse.status === 500) {
            if (errorResponse.error) {
                if (typeof errorResponse.error === 'string') {
                    return errorResponse.error;
                }

                if (errorResponse.error.message) {
                    return errorResponse.error.message;
                }
            }
        } else if (errorResponse.status === 400) {
            const isPropbablyModelStateError = this.isPropbablyModelStateError(errorResponse.error);

            if (isPropbablyModelStateError) {
                return this.generateModelStateErrorMessage(errorResponse.error);
            }
        } else if (errorResponse.status === 401) {
            return default401Message;
        }
    }

    private isPropbablyModelStateError(error: any) {
        return typeof error === 'object';
    }

    private generateModelStateErrorMessage(error: any) {
        return Object.keys(error).map(key => (error[key] || ''));

    }
}
