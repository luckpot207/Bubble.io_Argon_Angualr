import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  userToken = localStorage.getItem('userToken');
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.userToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.userToken}`
        }
      });
    }

    return next.handle(request);
  }
}
