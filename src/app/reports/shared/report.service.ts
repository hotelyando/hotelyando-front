import { Injectable } from '@angular/core';
import { Hotel } from 'src/app/general/shared/hotel';
import { Person } from 'src/app/rrhh/shared/person/person';
import { MigrationPerson } from './migrationPerson';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  static convertPersonToMigration({ val, hotel }: { val: Person[]; hotel: Hotel }): MigrationPerson[] {
    let migrationPersons: MigrationPerson[] = new Array();
    let p: MigrationPerson;

    for (let contador = 0; contador < val.length; contador++) {
      p = {
        hotelCode: hotel.uuid,
        codeCity: '',
        docType: val[contador].documentType['code'],
        document: val[contador].document,
        nationality: val[contador].country.code,
        lastName: val[contador].lastName,
        surName: '',
        name: val[contador].firstName,
        movementType: 'E',
        movementDate: val[contador].birthdate,
        originPlace: '',
        destinationPlace: '',
        birthDate: val[contador].birthdate
      };
      migrationPersons.push(p);
    }

    return migrationPersons;
  }
}
