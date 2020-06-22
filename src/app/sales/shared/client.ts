import { Country } from 'src/app/general/shared/country';

export interface Client {
  uuidPerson: string;
  typeDocument: string;
  document: string;
  name: string;
  country: Country;
}
