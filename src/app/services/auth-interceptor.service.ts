import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  getToken() {
    return localStorage.getItem('__token');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (!request.url.startsWith(`${environment.baseUrl}/${environment.auth}`)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
    }

    return next.handle(request);
  }
}
