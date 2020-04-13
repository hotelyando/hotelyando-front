import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsModule } from './clients/clients.module';
import { EmployeesModule } from './employees/employees.module';
import { HomeComponent } from './general/home/home.component';
import { InventoryModule } from './inventory/inventory.module';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';

const routes: Routes = [
  {
    path: 'app',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () => ClientsModule
      },
      {
        path: '',
        loadChildren: () => InventoryModule
      },
      {
        path: '',
        loadChildren: () => UsersModule
      },
      {
        path: '',
        loadChildren: () => ReportsModule
      },
      {
        path: '',
        loadChildren: () => EmployeesModule
      }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
