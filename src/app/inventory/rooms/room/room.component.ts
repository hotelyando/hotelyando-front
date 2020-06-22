import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { Messages } from 'src/app/general/messages';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { Item } from '../../shared/item';
import { ItemService } from '../../shared/item.service';
import { ItemInRoom, Room, RoomState, RoomType } from '../../shared/room';
import { RoomService } from '../../shared/room.service';

@Component({
  selector: 'ho-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  @ViewChild('stepper', null) stepper: MatStepper;

  roomForm: FormGroup;
  itemInRoomForm: FormGroup;
  items: Observable<Item[]>;
  displayedColumns: string[] = ['item', 'quantity', 'requireCheck', 'remove'];
  itemsInRoom: ItemInRoom[] = [];
  dataSource: MatTableDataSource<ItemInRoom>;

  types: Observable<RoomType[]>;

  private comforts: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private roomService: RoomService,
    private messagesService: MessagesService
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.itemsInRoom);
    this.types = this.roomService.getRoomTypes();
    this.items = this.itemService.list();

    this.roomForm = this.formBuilder.group({
      uuid: [null],
      id: [null, Validators.required],
      description: [null],
      floor: [1],
      area: [null],
      maxPersons: [2, Validators.required],
      noBeds: [1, Validators.required],
      freeParking: [false, Validators.required],
      roomType: [null, Validators.required],
      items: [null],
      comforts: [null],
      state: [RoomState.DISPONIBLE]
    });

    this.itemInRoomForm = this.formBuilder.group({
      item: [null, Validators.required],
      quantity: [1, Validators.required],
      requireCheck: [true, Validators.required]
    });
  }

  save() {
    if (!this.roomForm.valid) {
      this.stepper.selectedIndex = 0;
      return;
    }

    const room: Room = this.getInfoRoom();
    console.log('valido', room);
    this.roomService.save(room).subscribe(
      (roomSaved) => {
        this.roomForm.reset(roomSaved, { emitEvent: false });
        this.messagesService.showSuccessMessage(Messages.get('room_save_success'));
      },
      (error) => this.messagesService.showErrorMessage(error.message)
    );
  }

  getInfoRoom(): Room {
    const valuesRoom = this.roomForm.value;
    return {
      id: valuesRoom.id,
      description: valuesRoom.description,
      floor: valuesRoom.floor,
      area: valuesRoom.area,
      maximumPersons: valuesRoom.maxPersons,
      numberBeds: valuesRoom.noBeds,
      freeParking: valuesRoom.freeParking,
      roomType: valuesRoom.roomType.uuid,
      items: this.itemsInRoom,
      comforts: this.comforts,
      state: RoomState.DISPONIBLE
    } as Room;
  }

  getItemDescription(item: Item) {
    return item ? item.description : '';
  }

  getRoomTypeDescription(roomType: RoomType) {
    return roomType ? roomType.description : '';
  }

  addItem() {
    if (!this.itemInRoomForm.valid) {
      return;
    }

    if (this.existItemInList()) {
      const controlItem = this.itemInRoomForm.get('item');
      controlItem.setErrors({ itemAreadyExist: true });
    } else {
      const itemInRoom: ItemInRoom = this.createItemInRoom();
      this.dataSource.data.push(itemInRoom);
      this.dataSource.filter = '';
      this.resetItemInRoomForm();
    }
  }

  resetItemInRoomForm() {
    this.itemInRoomForm.reset(
      {
        item: null,
        quantity: 1,
        requireCheck: true
      },
      { emitEvent: false }
    );
  }

  private existItemInList() {
    const itemsInList = this.dataSource.data;
    const uuidItemToAdd = this.itemInRoomForm.value.item.uuid;
    const existItemInList = itemsInList.find((item) => uuidItemToAdd == item.item_uuid);
    return existItemInList;
  }

  private createItemInRoom(): ItemInRoom {
    return {
      item_uuid: this.itemInRoomForm.value.item.uuid,
      description: this.itemInRoomForm.value.item.description,
      quantity: this.itemInRoomForm.value.quantity,
      requireCheck: this.itemInRoomForm.value.requireCheck
    } as ItemInRoom;
  }

  getControl(controlName: string): AbstractControl {
    return this.itemInRoomForm.get(controlName);
  }

  removeItem(itemInRoom: ItemInRoom) {
    this.dataSource.data = this.dataSource.data.filter((item) => item.item_uuid != itemInRoom.item_uuid);
    this.dataSource.filter = '';
  }

  updateComforts(comforts: string[]) {
    this.comforts = comforts;
  }
}
