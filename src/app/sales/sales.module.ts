import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../general/material/material.module';
import { SaleComponent } from './sale/sale.component';
import { SalesListComponent } from './sales-list/sales-list.component';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales/sales.component';

@NgModule({
  declarations: [SalesComponent, SaleComponent, SalesListComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, SalesRoutingModule]
})
export class SalesModule {}
