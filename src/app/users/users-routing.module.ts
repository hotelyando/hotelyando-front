import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: 'add',
        component: AddUserComponent
      },
      {
        path: 'edit/:id',
        component: EditUserComponent
      },

      {
        path: 'list',
        component: UsersListComponent
      },

      { path: '', redirectTo: 'list', pathMatch: 'prefix' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
