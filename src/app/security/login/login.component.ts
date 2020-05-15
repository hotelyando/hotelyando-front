import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/general/shared/hotel';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'ho-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
  hotels: Hotel[];

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login() {
    const user = this.loginForm.get('user').value;
    const pass = this.loginForm.get('password').value;

    this.authenticationService.login(user, pass).subscribe((successLoggin) => {
      if (successLoggin) {
        this.router.navigate(['/app']);
      } else {
        this.error = 'Fallo el login';
      }
    });
  }
  external() {
    this.router.navigate(['/external']);
  }
}
