import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Messages } from 'src/app/general/messages';
import { ExcelService } from 'src/app/general/reports/ExcelService';
import { LABEL } from 'src/app/general/shared/label';
import { MessagesService } from 'src/app/general/shared/messages.service';
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
  displayedColumns: string[] = ['user', 'state', 'rol', 'edit', 'remove'];
  dataSource = ELEMENT_DATA;
  listaUsuarios: User[];
  estados: State[];
  constructor(
    private router: Router,
    private userService: UserService,
    private excelService: ExcelService,
    private messagesService: MessagesService
  ) {}
  ser;
  ngOnInit() {
    this.userService.list().subscribe((data) => {
      this.dataSource = data;
    });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.dataSource, 'listaUsuarios ');
  }

  edit(id: string) {
    this.router.navigate([`/app/users/edit/${id}`]);
  }

  remove(id: string) {
    const confirmMessage = Messages.get('confirm_delete', LABEL.user);
    this.messagesService.showConfirmMessage(confirmMessage).subscribe((shouldDelete) => {
      if (shouldDelete) {
        this.userService.remove(id).subscribe(
          (data) => {
            this.messagesService.showSuccessMessage(Messages.get('delete_success', LABEL.user));
          },
          (error) => {
            console.log('error al cerrar sesion', error);
          }
        );
      }
    });
  }
}
