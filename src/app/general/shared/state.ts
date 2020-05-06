export interface State {
  code: boolean;
  description: string;
}

export const Activo: State = {
  code: true,
  description: 'Activo'
};

export const Inactivo: State = {
  code: false,
  description: 'Inactivo'
};

export const STATES: State[] = [Activo, Inactivo];
