import { Country } from 'src/app/general/shared/country/country';
import { DocumentType } from './document-type';

export interface Person {
  uuid?: string;
  documentType: DocumentType;
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