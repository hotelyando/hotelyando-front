import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/security/shared/authentication.service';
import { Messages } from '../messages';
import { MessagesService } from '../shared/messages.service';

@Component({
  selector: 'ho-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService, private route: Router, private messagesService: MessagesService) {}

  ngOnInit() {}

  logout() {
    const confirmMessage = Messages.get('confirm_logout');
    this.messagesService.showConfirmMessage(confirmMessage).subscribe((shouldDelete) => {
      if (shouldDelete) {
        this.authenticationService.logout().subscribe(
          (data) => {
            console.log('exito al cerrar sesion', data);
            localStorage.clear();
            this.route.navigate([`/login`]);
          },
          (error) => {
            console.log('error al cerrar sesion', error);
            localStorage.clear();
            this.route.navigate([`/login`]);
          }
        );
      }
    });
  }
}
