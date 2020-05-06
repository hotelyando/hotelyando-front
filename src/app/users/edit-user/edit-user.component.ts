import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Messages } from 'src/app/general/messages';
import { LABEL } from 'src/app/general/shared/label';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { State, STATES } from 'src/app/general/shared/state';
import { Rol } from '../shared/rol';
import { RolService } from '../shared/rol.service';
import { User } from '../shared/user';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'ho-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  id: string;
  updated: boolean;
  rol: string;
  estado: string;
  usuario: User;
  addForm: FormGroup;
  indice = 0;
  indiceState = 0;

  estados: State[];

  public rolCtrl: FormControl = new FormControl();

  roles: Rol[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private rolService: RolService,
    private messagesService: MessagesService
  ) {
    this.addForm = this.formBuilder.group({
      usuario: [null, Validators.required],
      rol: [null, Validators.required],
      estado: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.estados = STATES;

    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.userService.find(this.id).subscribe((data) => {
      this.usuario = data;

      this.rolService.list().subscribe(
        (data) => {
          this.roles = data;
          for (let i = 0; i < this.roles.length; i++) {
            if (this.roles[i].name == this.usuario.rol) {
              this.indice = i;
            }
          }
        },
        (error) => {
          console.log('error listando los roles', error);
        },
        () => {
          for (let i = 0; i < this.estados.length; i++) {
            if (this.estados[i].code == this.usuario.state) {
              this.indiceState = i;
            }
          }

          this.addForm = this.formBuilder.group({
            usuario: [this.usuario.user, Validators.required],
            rol: [this.roles[this.indice]],
            estado: [this.estados[this.indiceState]]
          });
        }
      );
    });
  }

  //seteo de usuario
  setUser(): User {
    if (!this.addForm.invalid) {
      let userForm: User = {
        user: this.addForm.get('usuario').value,
        password: null,
        rol: this.addForm.get('rol').value.name,
        state: this.addForm.get('estado').value.code,
        registrationDate: '',
        hotelId: this.usuario.hotelId,
        personId: this.usuario.personId,
        uuid: this.usuario.uuid
      };
      return userForm;
    } else {
      this.messagesService.showErrorMessage(Messages.get('insert_error', LABEL.user));

      return null;
    }
  }

  onSave() {
    let usuarioA = this.setUser();
    //console.log('usuario sin actualizar es:', usuarioA);
    if (usuarioA != null) {
      this.userService.edit(usuarioA).subscribe(
        (data) => {
          this.usuario = data;
          this.messagesService.showSuccessMessage(Messages.get('edit_success', LABEL.user));
          this.router.navigate([`/app/users/list`]);
        },
        (error) => {
          this.messagesService.showErrorMessage(Messages.get('edit_error', LABEL.user, ':' + error));
        }
      );
    }
  }
  getUsuario() {
    return this.addForm.get('usuario');
  }
  cancel() {
    this.router.navigate([`/app/users/list`]);
  }
}
