export interface Hotel /*{
  uuid: string;
  name: string;
  email: string;
  logo?: string;
  phone?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  latitude?: string;
  longitude?: string;
}*/ {
  address: string;
  altitude: string;
  cellPhone: string;
  email: string;
  logo: string;
  latitude: string;
  name: string;
  nit: string;
  parameterize: ParameterHotel;
  phone: string;
  socialNetworks: string[];
  state: true;
  uuid: string;
}

export interface ParameterHotel {
  checkIn: string;
  checkOut: string;
  dataInformation: string;
  payingTaxes: true;
  taxPercentage: number;
  timeReservation: number;
}
