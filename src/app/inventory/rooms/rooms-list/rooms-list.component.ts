import { Component, OnInit } from '@angular/core';
import { Messages } from 'src/app/general/messages';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { Room } from '../../shared/room';
import { RoomService } from '../../shared/room.service';

@Component({
  selector: 'ho-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit {
  dataSource: Room[] = [];
  displayedColumns: string[] = ['id', 'roomType_uuid', 'state', 'floor', 'maximumPersons', 'numberBeds', 'items', 'score', 'actions'];

  constructor(private roomService: RoomService, private messagesService: MessagesService) {}

  ngOnInit() {
    this.loadList();
  }

  private loadList() {
    this.roomService.getRooms().subscribe((rooms) => {
      this.dataSource = rooms;
    });
  }

  hasRooms() {
    return this.dataSource && this.dataSource.length > 0;
  }

  getMessageNoContent() {
    return Messages.get('room_list_no_content');
  }
}
