import { Client } from './client';

export interface Sale {
  uuid?: string;
  date: Date;
  state: SaleState;
  client: Client;
  values: Value;
  items: Item[];
  rooms: Room[];
}

export enum SaleState {
  COTIZACION = 'Cotización',
  EN_PROCESO = 'En proceso',
  PAGADA = 'Pagada',
  FACTURADA = 'Facturada'
}
export interface Value {
  gross: number;
  tax: number;
  net: number;
  discount: number;
  total: number;
}

export interface Item {
  uuid: string;
  dateSale: Date;
  description: string;
  quantity: bigint;
  values: Value;
}

export interface Room {
  uuid: string;
  description: string;
  startDate: Date;
  endDate: Date;
  values: Value;
  guests: string[];
}
