import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authSvc: AuthService) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers.get("requireToken")) {
      const token = this.authSvc.tokenValue;
      if (token) {
        const authReq = request.clone({
          setHeaders: {
            auth: `${token}`
          }
        });

        return next.handle(authReq);
      }
    }
    return next.handle(request);
  }
}
