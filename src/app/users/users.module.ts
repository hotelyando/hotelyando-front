import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../general/material/material.module';
import { ActiveNoActivePipe } from '../general/shared/pipes/active-no-active.pipe';
import { AddUserComponent } from './add-user/add-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [UsersComponent, AddUserComponent, UsersListComponent, EditUserComponent, ChangePasswordComponent, ActiveNoActivePipe],
  imports: [CommonModule, ReactiveFormsModule, UsersRoutingModule, MaterialModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersModule {}
