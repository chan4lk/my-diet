import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService, private router: Router) {}
  getToken() {
    return this.storage.getItem<{ token: string }>('__token');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (
      !request.url.startsWith(`${environment.baseUrl}/${environment.auth}`) &&
      request.url !== `${environment.baseUrl}/${environment.users}`
    ) {
      const token = this.getToken();

      if (!token) {
        this.router.navigate(['/login']);
      } else {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token.token}`,
          },
        });
      }
    }

    return next.handle(request);
  }
}
