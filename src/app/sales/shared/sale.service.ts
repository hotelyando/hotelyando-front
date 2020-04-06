import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ResponseList } from 'src/app/general/shared/response';
import { environment } from 'src/environments/environment';
import { Sale } from './sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  constructor(private http: HttpClient) {}

  list(nationality: string, initDate: string, endDate: string): Observable<Sale[]> {
    let headers = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
    let options = {
      headers: headers
    };

    const url = environment.apiUrl;
    console.log(`${url}sale?nationality=` + nationality + '&initDate=' + initDate + '&endDate=' + endDate);

    return this.http
      .get<ResponseList<Sale>>(`${url}sale?nationality=` + nationality + '&initDate=' + initDate + '&endDate=' + endDate, options)
      .pipe(
        switchMap(data => of(data.content)),
        catchError(e => {
          return empty;
        })
      );
  }
}