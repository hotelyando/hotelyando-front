import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Response } from 'src/app/general/shared/response';
import { environment } from 'src/environments/environment';
import { messages } from '../messages';
import { Hotel } from './hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  constructor(private http: HttpClient) {}

  find(): Observable<Hotel> {
    const url = environment.apiUrl;
    return this.http.get<Response<Hotel>>(`${url}hotel/`).pipe(
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

  edit(hotel: Hotel): Observable<any> {
    const url = environment.apiUrl;

    return this.http.put<any>(`${url}hotel`, hotel).pipe(
      switchMap((data) => of(data.content)),
      catchError((error) => {
        console.log(hotel);
        console.log('ops:::', error);
        if (error.status == 400) {
          return throwError(error.error.message);
        } else {
          return throwError(messages.tecnicalError);
        }
      })
    );
  }
}
