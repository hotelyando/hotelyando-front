import { CountryMock } from 'src/app/general/shared/country/country.mock';
import { CEDULA } from 'src/app/rrhh/shared/person/document-type';
import { Person } from 'src/app/rrhh/shared/person/person';

export class PersonMock {
  static getDefaultClient(): Person {
    return {
      uuid: 'uuidDefaultClient',
      documentType: CEDULA,
      document: '10254875',
      name: 'Victoria Lopez',
      firstName: 'Vitoria',
      lastName: 'Lopez',
      email: 'vitoria@hotelyando.com',
      country: CountryMock.colombia()
    } as Person;
  }
}
