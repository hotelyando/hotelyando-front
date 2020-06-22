import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { CalendarService } from 'src/app/general/shared/calendar.service';
import { ResponseList } from 'src/app/general/shared/response';
import { Person } from 'src/app/rrhh/shared/person/person';
import { environment } from 'src/environments/environment';
import { Client } from './client';
import { PersonMock } from './person.mock';
import { Sale, SaleState } from './sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  constructor(private http: HttpClient, private calendarService: CalendarService) {}

  createNewSale(): Sale {
    return {
      date: this.calendarService.getCurrentDate(),
      state: SaleState.EN_PROCESO,
      client: this.getDefaultClient(),
      values: {
        gross: 0,
        tax: 0,
        net: 0,
        discount: 0,
        total: 0
      },
      items: [],
      rooms: []
    };
  }

  getDefaultClient(): Client {
    //TODO: Llamar método http para que retorne un cliente por defecto, el valor recibido es una persona.
    return this.convertPersonToClient(PersonMock.getDefaultClient());
  }

  private convertPersonToClient(person: Person): Client {
    return {
      uuidPerson: person.uuid,
      typeDocument: person.documentType,
      document: person.document,
      name: person.name,
      country: person.country
    } as Client;
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
