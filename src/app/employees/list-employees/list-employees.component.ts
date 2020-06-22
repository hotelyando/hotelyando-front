import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/general/reports/ExcelService';
import { Person } from 'src/app/rrhh/shared/person/person';
import { PersonService } from 'src/app/rrhh/shared/person/person.service';
import { EmployeeHotel } from '../shared/empleadoHotel';
import { Employee } from '../shared/employee';
import { EmployeeService } from '../shared/employee.service';

const ELEMENT_DATA: Employee[] = [];
const ELEMENT_DATA_HOTEL: EmployeeHotel[] = [];

@Component({
  selector: 'ho-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})
export class ListEmployeesComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'salary', 'initDate', 'endDate'];

  dataSourceEmpleado = ELEMENT_DATA;
  dataSource = ELEMENT_DATA_HOTEL;
  persona: Person;
  empleadoHotel: EmployeeHotel;

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private personService: PersonService,
    private excelService: ExcelService
  ) {}

  ngOnInit() {
    this.employeeService.list().subscribe((data) => {
      this.dataSourceEmpleado = data;
      this.dataSource = ELEMENT_DATA_HOTEL;
      let contador = 0;
      this.dataSourceEmpleado.forEach((element) => {
        this.personService.find(element.personId).subscribe(
          (dataPersona) => {
            this.empleadoHotel = {
              person: dataPersona,
              employee: element,
              user: null
            };

            this.dataSource[contador] = this.empleadoHotel;
            contador++;
          },
          (error) => {
            console.log('error listando empleado con id:' + element.personId, error);
          }
        );
      });
    });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.dataSource, 'listaEmpleados ');
  }

  editar(id: string) {
    this.router.navigate([`/app/employee/edit/` + id]);
  }
}
