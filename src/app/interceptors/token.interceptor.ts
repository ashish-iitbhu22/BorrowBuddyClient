import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private localStorageService:LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.localStorageService.getItem('borrowbuddy')?.auth_token;
   request = request.clone({
     withCredentials: true,
     setHeaders: {
       Authorization: token || 'null',
     },
   });
    return next.handle(request);
  }
}
