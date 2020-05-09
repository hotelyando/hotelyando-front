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
  oldPassword: string;
  newPassword: string;
}
