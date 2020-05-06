import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemsComponent } from './items/add-items/add-items.component';
import { EditItemComponent } from './items/edit-item/edit-item.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ItemsComponent } from './items/items/items.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule {}
