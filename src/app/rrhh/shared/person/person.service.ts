import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { messages } from 'src/app/general/messages';
import { Response, ResponseList } from 'src/app/general/shared/response';
import { environment } from 'src/environments/environment';
import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  person: Person;
  constructor(private http: HttpClient) {}

  list(type: string): Observable<Person[]> {
    let usuarios: Person[];
    const url = environment.apiUrl;
    return this.http.get<ResponseList<Person>>(`${url}person?personType=` + type).pipe(
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

  listSale(nationality: string, initDate: string, endDate: string): Observable<Person[]> {
    let usuarios: Person[];
    const url = environment.apiUrl;
    return this.http
      .get<ResponseList<Person>>(`${url}person?nationality=` + nationality + '&initDate' + initDate + '&endDate=' + endDate)
      .pipe(
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

  find(document: string): Observable<Person> {
    const url = environment.apiUrl;
    console.log(`${url}person/` + document);
    return this.http.get<Response<Person>>(`${url}person/` + document).pipe(
      switchMap((data) => of(data.content)),
      catchError((error) => {
        console.log(error);
        if (error.status == 400) {
          return throwError(error.error.message);
        } else {
          return throwError(messages.tecnicalError);
        }
      })
    );
  }

  findDocument(typeDocument: string, document: string): Observable<Person[]> {
    const url = environment.apiUrl;
    console.log(`${url}person/` + typeDocument + '/' + document);
    return this.http.get<ResponseList<Person>>(`${url}person/` + typeDocument + '/' + document).pipe(
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

  findDocument2(typeDocument: string, document: string): Observable<Person[]> {
    const url = environment.apiUrl;
    return this.http.get<ResponseList<Person>>(`${url}person/` + typeDocument + '/' + document).pipe(
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

  add(person: Person): Observable<Person> {
    const url = environment.apiUrl;
    return this.http.post<Response<Person>>(`${url}person`, person).pipe(
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

  delete(person: Person): Observable<Person> {
    const url = environment.apiUrl;

    return this.http.delete<Response<Person>>(`${url}person/` + person.uuid).pipe(
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
}
