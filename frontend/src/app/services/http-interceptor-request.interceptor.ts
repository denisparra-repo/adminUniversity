import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable()
export class HttpIntercetorRequest implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(req.url.includes('api.distancematrix.ai')) {
      return next.handle(req);
    }

    if(req.url.includes('auth/login')) {
      return next.handle(req.clone({setHeaders: {'Access-Control-Allow-Origin': 'http://45.61.56.170:8080'}}));
    }
    const token = localStorage.getItem('token') || '';
    const cloneReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(cloneReq).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        this.router.navigate(['/authentication']);
      }
      return throwError(error);
    }));
  }
}
