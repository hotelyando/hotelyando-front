import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', token) });
    }
    // return next.handle(request);

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.router.navigateByUrl('/login');
        }
        return throwError(err);
      })
    );
  }
}
