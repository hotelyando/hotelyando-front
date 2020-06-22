import { Person } from 'src/app/rrhh/shared/person/person';
import { User } from 'src/app/users/shared/user';
import { Employee } from './employee';

export interface EmployeeHotel {
  employee: Employee;
  person: Person;
  user: User;
}
