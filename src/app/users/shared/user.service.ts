import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { messages } from 'src/app/general/messages';
import { Response, ResponseList } from 'src/app/general/shared/response';
import { environment } from 'src/environments/environment';
import { ChangePassword, User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  add(user: User): Observable<User> {
    const url = environment.apiUrl;
    return this.http.post<Response<User>>(`${url}user`, user).pipe(
      switchMap((data) => of(data.content)),
      catchError((error) => {
        if (error.status == 400) {
          return throwError(error.error.message);
        } else {
          return throwError(messages.tecnicalError);
        }
      })
    );
  }

  edit(user: User): Observable<any> {
    const url = environment.apiUrl;

    return this.http.put<any>(`${url}user`, user).pipe(
      switchMap((data) => of(data.content)),
      catchError((error) => {
        console.log(user);
        console.log('ops:::', error);
        if (error.status == 400) {
          return throwError(error.error.message);
        } else {
          return throwError(messages.tecnicalError);
        }
      })
    );
  }

  list(): Observable<User[]> {
    let usuarios: User[];
    const url = environment.apiUrl;

    return this.http.get<ResponseList<User>>(`${url}user`).pipe(
      switchMap((data) => of(data.content)),
      catchError((error) => {
        if (error.status == 400) {
          return throwError(error.error.message);
        } else {
          return throwError(messages.tecnicalError);
        }
      })
    );
  }

  find(id: string): Observable<User> {
    const url = environment.apiUrl;
    return this.http.get<Response<User>>(`${url}user/` + id).pipe(
      switchMap((data) => of(data.content)),
      catchError((error) => {
        if (error.status == 400) {
          return throwError(error.error.message);
        } else {
          return throwError(messages.tecnicalError);
        }
      })
    );
  }

  changePassword(changePassword: ChangePassword): Observable<string> {
    const url = environment.apiUrl;

    return this.http.put<Response<User>>(`${url}user/change/  `, changePassword).pipe(
      switchMap((data) => of(data.message)),
      catchError((error) => {
        if (error.status == 400) {
          return throwError(error.error.message);
        } else {
          return throwError(messages.tecnicalError);
        }
      })
    );
  }
}
