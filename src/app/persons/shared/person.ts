import { Country } from 'src/app/clients/shared/country';

export interface Person {
  uuid?: string;
  documentType: string;
  document: string;
  name: string;
  // TODO: borrar first y lastname
  firstName: string;
  lastName: string;
  email: string;
  birthdate?: string;
  address?: string;
  phone?: string;
  cellPhone?: string;
  country: Country;
}
