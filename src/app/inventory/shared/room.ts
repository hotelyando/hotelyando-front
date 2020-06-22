export interface Room {
  uuid?: string;
  id: string; // identificación de la habitación puede ser un numero (101) o combinación número letra (A-01)
  description?: string; // descripción general de la habitación
  floor: number; // piso en el que se encuentra la habitación
  area?: number; // tamaño de la habitación dada en metros cuadrados
  maximumPersons: number; // número máximo de personas que pueden hospedarse en la habitación
  numberBeds: number; // número camas en la habitación
  freeParking: boolean; // inidica si la habitación incluye parqueadero gratis
  roomType: string; // identificación del tipo de habitación
  items?: ItemInRoom[]; // lista de items que pueden estar disponibles en la habitación para ser vendidos
  comforts?: string[]; // lista de códigos de las comodidades con las que cuenta la habitación (wifi, ascensor, nevera, caja fuerte ...)
  state: RoomState; // estado en el que se encuentra la habitación
  score?: number;
}

export interface RoomType {
  uuid?: string;
  description: string;
  priceDay: number;
  priceHour: number;
  priceDetails?: [PriceDetail];
}

export interface PriceDetail {
  day: string;
  priceDay: number;
  priceHour: number;
  startTime?: string;
  endTime?: string;
  holiday?: boolean;
}

export interface ItemInRoom {
  item_uuid: string;
  description: string;
  quantity: string;
  requireCheck: boolean;
}

export enum RoomState {
  DISPONIBLE = 'Disponible',
  RESERVADA = 'Reservada',
  OCUPADA = 'Ocupada',
  LIMPIEZA = 'Limpieza',
  MANTENIMIENTO = 'Mantenimiento'
}
