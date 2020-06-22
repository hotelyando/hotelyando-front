import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SaleComponent } from './sale/sale.component';
import { SalesListComponent } from './sales-list/sales-list.component';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales/sales.component';

@NgModule({
  declarations: [SaleComponent, SalesListComponent, SalesComponent],
  imports: [CommonModule, SalesRoutingModule]
})
export class SalesModule {}
