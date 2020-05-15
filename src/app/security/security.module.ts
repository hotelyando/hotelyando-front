import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../general/material/material.module';
import { LoginComponent } from './login/login.component';
import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security/security.component';
import { ExternalComponent } from './external/external.component';

@NgModule({
  declarations: [LoginComponent, SecurityComponent, ExternalComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, SecurityRoutingModule, HttpClientModule],
  exports: [LoginComponent]
})
export class SecurityModule {}
