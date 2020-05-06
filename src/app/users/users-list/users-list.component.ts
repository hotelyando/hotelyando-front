import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/general/reports/ExcelService';
import { State } from 'src/app/general/shared/state';
import { User } from '../shared/user';
import { UserService } from '../shared/user.service';

const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'ho-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['user', 'state', 'rol', 'edit'];
  dataSource = ELEMENT_DATA;
  listaUsuarios: User[];
  estados: State[];
  constructor(private router: Router, private userService: UserService, private excelService: ExcelService) {}

  ngOnInit() {
    this.userService.list().subscribe((data) => {
      this.dataSource = data;
    });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.dataSource, 'listaUsuarios ');
  }

  editar(id: string) {
    this.router.navigate([`/app/users/edit/${id}`]);
  }
}
