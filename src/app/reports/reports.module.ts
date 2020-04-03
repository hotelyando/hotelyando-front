import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../general/material/material.module';
import { PersonsReportComponent } from './persons-report/persons-report.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports/reports.component';
import { SalesReportsComponent } from './sales-reports/sales-reports.component';

@NgModule({
  declarations: [PersonsReportComponent, ReportsComponent, SalesReportsComponent],
  imports: [CommonModule, ReactiveFormsModule, ReportsRoutingModule, MaterialModule]
})
export class ReportsModule {}
