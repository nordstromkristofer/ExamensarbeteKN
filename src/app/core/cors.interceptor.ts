import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CorsInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const headers = new HttpHeaders()
            .set('Access-Control-Allow-Origin', '*')
            .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
            .set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        const request = req.clone({ headers });
        return next.handle(request);
    }
}

