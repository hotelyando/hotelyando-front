import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExternalComponent } from './external/external.component';
import { LoginComponent } from './login/login.component';
import { SecurityComponent } from './security/security.component';

const routesRooms: Routes = [
  {
    path: 'login',
    component: SecurityComponent,
    children: [{ path: '', component: LoginComponent }]
  },
  {
    path: 'externalPassword',
    component: ExternalComponent,
    children: [{ path: '', component: ExternalComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routesRooms)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {}
