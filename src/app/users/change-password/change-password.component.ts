import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Messages } from 'src/app/general/messages';
import { LABEL } from 'src/app/general/shared/label';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { ChangePassword } from '../shared/user';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'ho-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(
    private userServide: UserService,
    private router: Router,

    private formBuilder: FormBuilder,
    private messagesService: MessagesService
  ) {}

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      password: [null, Validators.required],
      newPassword: [null, Validators.required]
    });
  }

  edit() {
    if (this.changePasswordForm.invalid) {
      this.messagesService.showErrorMessage(Messages.get('edit_error', LABEL.password, ''));
    }
    let changePassword: ChangePassword = {
      password: this.changePasswordForm.get('password').value,
      newPassword: this.changePasswordForm.get('newPassword').value,
      hotelId: '',
      user: localStorage.getItem('userLogged')
    };
    console.log('usuario h:', changePassword);
    this.userServide.changePassword(changePassword).subscribe(
      (data) => {
        this.messagesService.showSuccessMessage(Messages.get('edit_success', LABEL.user, data));
      },
      (error) => {
        this.messagesService.showErrorMessage(Messages.get('edit_error', LABEL.user, error));
      }
    );
  }

  cancel() {
    this.router.navigate([`/app/users/list`]);
  }
}
