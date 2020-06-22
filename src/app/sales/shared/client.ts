import { Country } from 'src/app/general/shared/country/country';
import { DocumentType } from 'src/app/rrhh/shared/person/document-type';

export interface Client {
  uuidPerson: string;
  typeDocument: DocumentType;
  document: string;
  name: string;
  country: Country;
}
