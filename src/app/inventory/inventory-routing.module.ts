import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditHotelComponent } from './hotels/edit-hotel/edit-hotel.component';
import { HotelComponent } from './hotels/hotel/hotel.component';
import { HotelsComponent } from './hotels/hotels.component';
import { AddItemsComponent } from './items/add-items/add-items.component';
import { EditItemComponent } from './items/edit-item/edit-item.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ItemsComponent } from './items/items/items.component';
import { AddParameterComponent } from './parameters/add-parameter/add-parameter.component';
import { EditParameterComponent } from './parameters/edit-parameter/edit-parameter.component';
import { ParameterListComponent } from './parameters/parameter-list/parameter-list.component';
import { ParametersComponent } from './parameters/parameters.component';
import { RoomTypeListComponent } from './rooms/room-type-list/room-type-list.component';
import { RoomTypeComponent } from './rooms/room-type/room-type.component';
import { RoomComponent } from './rooms/room/room.component';
import { RoomsListComponent } from './rooms/rooms-list/rooms-list.component';
import { RoomsComponent } from './rooms/rooms/rooms.component';

const routes: Routes = [
  {
    path: 'rooms',
    component: RoomsComponent,
    children: [
      {
        path: 'list',
        component: RoomsListComponent
      },
      {
        path: 'type',
        component: RoomTypeComponent
      },
      {
        path: 'typeList',
        component: RoomTypeListComponent
      },
      {
        path: 'typeList/:uuid',
        component: RoomTypeComponent
      },
      {
        path: ':id',
        component: RoomComponent
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  },
  {
    path: 'items',
    component: ItemsComponent,
    children: [
      {
        path: 'add',
        component: AddItemsComponent
      },
      {
        path: 'edit/:id',
        component: EditItemComponent
      },
      {
        path: 'list',
        component: ItemsListComponent
      },

      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  },
  {
    path: 'hotels',
    component: HotelsComponent,
    children: [
      {
        path: 'edit',
        component: EditHotelComponent
      },
      {
        path: 'show',
        component: HotelComponent
      },

      { path: '', redirectTo: 'show', pathMatch: 'full' }
    ]
  },
  {
    path: 'parameters',
    component: ParametersComponent,
    children: [
      {
        path: 'add',
        component: AddParameterComponent
      },
      {
        path: 'edit/:id',
        component: EditParameterComponent
      },
      {
        path: 'list',
        component: ParameterListComponent
      },

      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule {}
