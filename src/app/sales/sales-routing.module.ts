import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleComponent } from './sale/sale.component';
import { SalesListComponent } from './sales-list/sales-list.component';
import { SalesComponent } from './sales/sales.component';

const routes: Routes = [
  {
    path: 'sales',
    component: SalesComponent,
    children: [
      {
        path: 'list',
        component: SalesListComponent
      },
      {
        path: ':id',
        component: SaleComponent
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {}
