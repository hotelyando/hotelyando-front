import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { CalendarService } from 'src/app/general/shared/calendar.service';
import { ResponseList } from 'src/app/general/shared/response';
import { Person } from 'src/app/rrhh/shared/person/person';
import { environment } from 'src/environments/environment';
import { Client, Sale } from './sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  constructor(private http: HttpClient, private calendarService: CalendarService) {}

  create(): Sale {
    const b: Person = null;
    // let newSale: Sale = {
    //   date: this.calendarService.getCurrentDate(),
    //   state: SaleState.EN_PROCESO,
    //   client: this.getDefaultClient();
    // };
    return null;
  }

  getDefaultClient(): Client {
    //TODO: Llamar método http para que retorne un cliente por defecto.
    return null;
  }

  list(nationality: string, initDate: string, endDate: string): Observable<Sale[]> {
    const url = environment.apiUrl;
    console.log(`${url}sale?nationality=` + nationality + '&initDate=' + initDate + '&endDate=' + endDate);

    return this.http
      .get<ResponseList<Sale>>(`${url}sale?nationality=` + nationality + '&initDate=' + initDate + '&endDate=' + endDate)
      .pipe(
        switchMap((data) => of(data.content)),
        catchError((e) => {
          return empty;
        })
      );
  }
}
