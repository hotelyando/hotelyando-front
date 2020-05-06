import { Component, OnInit } from '@angular/core';
import { Messages } from 'src/app/general/messages';
import { Hotel } from 'src/app/general/shared/hotel';
import { HotelService } from 'src/app/general/shared/hotel.service';
import { LABEL } from 'src/app/general/shared/label';
import { MessagesService } from 'src/app/general/shared/messages.service';

const ELEMENT_DATA: string[] = [];

@Component({
  selector: 'ho-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  hotel: Hotel;
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['socialNetwork'];

  constructor(private hotelService: HotelService, private messagesService: MessagesService) {}

  ngOnInit() {
    this.hotelService.find().subscribe(
      (data) => {
        this.hotel = data;
        this.dataSource = data.socialNetworks;

        console.log(this.dataSource);
      },
      (error) => {
        console.log('opss:', error);
        this.messagesService.showErrorMessage(Messages.get('retrieve_error', LABEL.hotel));
      }
    );
  }
}
