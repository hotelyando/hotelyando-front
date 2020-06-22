import { Country } from './country';

export class CountryMock {
  static colombia(): Country {
    return { code: '169', name: 'Colombia' };
  }
}
