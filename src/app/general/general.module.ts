import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { ClientsModule } from '../clients/clients.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { MenuComponent } from './menu/menu.component';
import { ErrorsComponent } from './errors/errors/errors.component';

@NgModule({
  declarations: [DashboardComponent, MenuComponent, HomeComponent, ErrorsComponent],
  imports: [CommonModule, AppRoutingModule, MaterialModule, ClientsModule],
  exports: [HomeComponent]
})
export class GeneralModule {}
