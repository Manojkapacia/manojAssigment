import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userData = (localStorage.getItem('loggedInUser'))
    if(userData) {
      const token = JSON.parse(userData).token
      const tokenizedReq = req.clone({ headers: req.headers.set('Authorization',token) });
      return next.handle(tokenizedReq);
    }
    return next.handle(req);
  }
}
