import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Interceptor } from './Interceptor';

@Injectable()
export class SkipInterceptorService {

  HeaderKey = 'X-NNResurs-Skip-Intercept';

  createSkipHeader(interceptors: Interceptor) {
    return new HttpHeaders({
      [this.HeaderKey]: interceptors.toString()
    });
  }

  appendOrSetSkipHeader(headers: HttpHeaders, interceptors: Interceptor) {
    if (headers.has(this.HeaderKey)) {
      return headers.set(this.HeaderKey, interceptors.toString());
    } else {
      return headers.append(this.HeaderKey, interceptors.toString());
    }
  }

  shouldSkip(request: HttpRequest<any>, interceptor: Interceptor): boolean {
    const headers = request.headers;
    if (!headers.has(this.HeaderKey)) {
      return false;
    }

    const value = this.getHeaderInterceptorValue(headers);

    // tslint:disable-next-line:no-bitwise
    return (value & interceptor) === interceptor;
  }

  markAsSkipped(request: HttpRequest<any>, interceptor: Interceptor) {
    return request.clone({
      headers: this.consumeHeaders(request.headers, interceptor)
    });
  }

  consumeHeaders(headers: HttpHeaders, interceptor: Interceptor): HttpHeaders {
    if (!headers.has(this.HeaderKey)) {
      return headers;
    }

    let value = this.getHeaderInterceptorValue(headers);

    // tslint:disable-next-line:no-bitwise
    value &= ~interceptor;

    if (value === Interceptor.None) {
      return headers.delete(this.HeaderKey);
    }

    return headers.set(this.HeaderKey, value.toString());
  }

  private getHeaderInterceptorValue(headers: HttpHeaders): Interceptor {
    const value = headers.get(this.HeaderKey);

    if (!value) {
      return Interceptor.None;
    }

    return <Interceptor>(Number(value));
  }
}
