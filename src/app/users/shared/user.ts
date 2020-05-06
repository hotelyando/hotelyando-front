export interface User {
  rol: string;
  state: boolean;
  registrationDate: string;
  hotelId: string;
  password: string;
  personId: string;
  user: string;
  uuid: string;
}

export interface ChangePassword {
  hotelId: string;
  password: string;
  newPassword: string;
  user: string;
}
