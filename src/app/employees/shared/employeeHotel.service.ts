import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { messages } from 'src/app/general/messages';
import { Response } from 'src/app/general/shared/response';
import { Person } from 'src/app/rrhh/shared/person/person';
import { environment } from 'src/environments/environment';
import { EmployeeHotel } from './empleadoHotel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeHotelService {
  constructor(private http: HttpClient) {}

  save(employeeHotel: EmployeeHotel): Observable<Person> {
    const url = environment.apiUrl;
    return this.http.post<Response<Person>>(`${url}other/employee`, employeeHotel).pipe(
      switchMap((data) => of(data.content)),
      catchError((error) => {
        console.log('ops>>>', error);
        if (error.status == 400) {
          return throwError(error.error.message);
        } else {
          return throwError(messages.tecnicalError);
        }
      })
    );
  }
}
