import { Component, OnInit } from '@angular/core';
import { Messages } from 'src/app/general/messages';
import { LABEL } from 'src/app/general/shared/label';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { RoomType } from '../../shared/room';
import { RoomService } from '../../shared/room.service';

@Component({
  selector: 'ho-room-type-list',
  templateUrl: './room-type-list.component.html',
  styleUrls: ['./room-type-list.component.scss']
})
export class RoomTypeListComponent implements OnInit {
  dataSource: RoomType[] = [];
  displayedColumns: string[] = ['description', 'priceDay', 'priceHour', 'priceDetails', 'actions'];

  constructor(private roomService: RoomService, private messagesService: MessagesService) {}

  ngOnInit() {
    this.loadList();
  }

  private loadList() {
    this.roomService.getRoomTypes().subscribe((roomTypes) => {
      this.dataSource = roomTypes;
    });
  }

  hasRoomTypes() {
    return this.dataSource && this.dataSource.length > 0;
  }

  hasPriceDetails(roomType: RoomType) {
    return roomType && roomType.priceDetails && roomType.priceDetails.length > 0;
  }

  getMessageNoContent() {
    return Messages.get('priceDetail_list_noContent');
  }

  delete(roomType: RoomType) {
    const confirmMessage = Messages.get('delete_confirm', LABEL.room_type);
    this.messagesService.showConfirmMessage(confirmMessage).subscribe((shouldDelete) => {
      if (shouldDelete) {
        this.roomService.delete(roomType).subscribe(
          () => {
            this.messagesService.showSuccessMessage(Messages.get('delete_success', LABEL.room_type));
            this.loadList();
          },
          (error) => this.messagesService.showErrorMessage(error.message)
        );
      }
    });
  }
}
