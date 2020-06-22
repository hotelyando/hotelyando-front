import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Response, ResponseList } from 'src/app/general/shared/response';
import { environment } from 'src/environments/environment';
import { Country } from './country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private http: HttpClient) {}

  list(): Observable<Country[]> {
    const url = environment.apiUrl;

    return this.http.get<ResponseList<Country>>(`${url}country`).pipe(
      switchMap((data) => of(data.content)),
      catchError((e) => {
        console.log(e);
        return empty;
      })
    );
  }

  find(): Observable<Country> {
    const url = environment.apiUrl;
    return this.http.get<Response<Country>>(`${url}country/`).pipe(
      switchMap((data) => of(data.content)),
      catchError((e) => {
        console.log(e);
        return empty;
      })
    );
  }
}
