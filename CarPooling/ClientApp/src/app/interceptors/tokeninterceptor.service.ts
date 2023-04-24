import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpClient
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokeninterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  // Getting  the value of the Token 
  token = this.auth.getToken();

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //Checking if the Token Exists and adding the header if it exists
    if (this.token) {
      req = req.clone({
        setHeaders: { Authorization: `bearer ${this.token.slice(1,-1)}` },
      });
    }
    return next.handle(req);
  }
}
