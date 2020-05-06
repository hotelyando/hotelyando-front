import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParameterListComponent } from './parameter-list/parameter-list.component';
import { AddParameterComponent } from './add-parameter/add-parameter.component';
import { EditParameterComponent } from './edit-parameter/edit-parameter.component';
import { ParametersComponent } from './parameters.component';

@NgModule({
  declarations: [ParameterListComponent, AddParameterComponent, EditParameterComponent, ParametersComponent],
  imports: [
    CommonModule
  ]
})
export class ParametersModule { }
