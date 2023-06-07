import { SkipInterceptorService } from './skip-interceptor.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { take, catchError, share } from 'rxjs/operators';
import { Interceptor } from './Interceptor';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, private skipInterceptorService: SkipInterceptorService) { }

  get<T>(url: string, params?: any, headers?: HttpHeaders, skipInterceptors?: Interceptor): Observable<T> {
    headers = this.getHeaders(headers, skipInterceptors);
    const resolvedUrl = this.getUrl(url);

    const request = this.httpClient.get<T>(resolvedUrl, { headers: headers, params: new HttpParams({ fromObject: params || {} }) });

    return this.doRequest(request);
  }

  post<T>(url: string, body: any, params?: any, headers?: HttpHeaders, skipInterceptors?: Interceptor): Observable<T> {
    headers = this.getHeaders(headers, skipInterceptors);
    const resolvedUrl = this.getUrl(url);
    const ensuredBody = this.ensureBody(body);

    const request = this.httpClient.post<T>(resolvedUrl, ensuredBody, { headers, params: new HttpParams({ fromObject: params || {} }) });

    return this.doRequest(request);
  }

  put<T>(url: string, body?: any, params?: any, headers?: HttpHeaders, skipInterceptors?: Interceptor): Observable<T> {
    headers = this.getHeaders(headers, skipInterceptors);
    const resolvedUrl = this.getUrl(url);
    const ensuredBody = this.ensureBody(body);

    const request = this.httpClient.put<T>(resolvedUrl, ensuredBody, { headers, params: new HttpParams({ fromObject: params || {} }) });

    return this.doRequest(request);
  }

  delete<T>(url: string, params?: any, headers?: HttpHeaders, skipInterceptors?: Interceptor): Observable<T> {
    headers = this.getHeaders(headers, skipInterceptors);
    const resolvedUrl = this.getUrl(url);

    const request = this.httpClient.delete<T>(resolvedUrl, { headers, params: new HttpParams({ fromObject: params || {} }) });

    return this.doRequest(request);
  }

  patch<T>(url: string, body?: any, params?: any, headers?: HttpHeaders, skipInterceptors?: Interceptor): Observable<T> {
    headers = this.getHeaders(headers, skipInterceptors);
    const resolvedUrl = this.getUrl(url);

    const request = this.httpClient.patch<T>(resolvedUrl, body, { headers, params: new HttpParams({ fromObject: params || {} }) });

    return this.doRequest(request);
  }

  head<T>(url: string, params: any, headers?: HttpHeaders, skipInterceptors?: Interceptor): Observable<T> {
    headers = this.getHeaders(headers, skipInterceptors);
    const resolvedUrl = this.getUrl(url);

    const request = this.httpClient.head<T>(resolvedUrl, { headers, params: new HttpParams({ fromObject: params || {} }) });

    return this.doRequest(request);
  }

  private getHeaders(headers?: HttpHeaders, skipInterceptors?: Interceptor): HttpHeaders {
    headers = headers || new HttpHeaders();

    if (!headers.has('Content-Type')) {
      headers = headers.append('Content-Type', 'application/json');
    }
    if (!headers.has('Accept')) {
      headers = headers.append('Accept', 'application/json');
    }

    if (skipInterceptors) {
      headers = this.skipInterceptorService.appendOrSetSkipHeader(headers, skipInterceptors);
    }

    return headers;
  }

  private getUrl(url: string): string {
    url = `http://localhost:5000/api/${url}`;

    return url;
  }

  private doRequest<T>(request: Observable<T>): Observable<T> {
    return <Observable<T>>request
      .pipe(
        take(1),
        share()
      );
  }

  private ensureBody(body: any): any {
    if (body === undefined || body === null) {
      return '';
    }

    return body;
  }
}
