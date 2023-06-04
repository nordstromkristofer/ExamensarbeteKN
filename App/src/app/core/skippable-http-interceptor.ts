import { Interceptor } from './Interceptor';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SkipInterceptorService } from './skip-interceptor.service';

export default abstract class SkippableHttpInterceptor implements HttpInterceptor {

  protected abstract get Id(): Interceptor

  constructor(protected skipInterceptorService: SkipInterceptorService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const shouldSkip = this.skipInterceptorService.shouldSkip(request, this.Id);

    if (shouldSkip) {
      const updatedRequest = this.skipInterceptorService.markAsSkipped(request, this.Id);

      return next.handle(updatedRequest);
    }

    return null!;
  }
}
