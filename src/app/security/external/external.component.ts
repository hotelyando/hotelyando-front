import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Messages } from 'src/app/general/messages';
import { LABEL } from 'src/app/general/shared/label';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { SendPassword } from 'src/app/users/shared/user';
import { UserService } from 'src/app/users/shared/user.service';

@Component({
  selector: 'ho-external',
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.scss']
})
export class ExternalComponent implements OnInit {
  sendForm: FormGroup;

  constructor(
    private usuarioService: UserService,
    private formBuilder: FormBuilder,
    private messagesService: MessagesService,
    private route: Router
  ) {}

  ngOnInit() {
    this.sendForm = this.formBuilder.group({
      user: [null, Validators.required]
    });
  }

  send() {
    if (this.sendForm.invalid) {
      this.messagesService.showErrorMessage(Messages.get('empty_user', LABEL.user));
    }

    let sendPassword: SendPassword = {
      login: this.sendForm.get('user').value
    };
    this.usuarioService.sendTokenUser(sendPassword).subscribe(
      (data) => {
        this.messagesService.showSuccessMessage(Messages.get('message_generic', data));
        this.route.navigate([`/login`]);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log('send>>>');
  }
}
