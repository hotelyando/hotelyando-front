import { Component, OnInit } from '@angular/core';
import { Messages } from 'src/app/general/messages';
import { Hotel, ParameterHotel } from 'src/app/general/shared/hotel';
import { HotelService } from 'src/app/general/shared/hotel.service';
import { LABEL } from 'src/app/general/shared/label';
import { MessagesService } from 'src/app/general/shared/messages.service';

const ELEMENT_DATA: string[] = [];

const ELEMENT_DATA_COMFORT: string[] = [];

@Component({
  selector: 'ho-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  hotel: Hotel;
  dataSource = ELEMENT_DATA;
  dataSourceComfort = ELEMENT_DATA_COMFORT;
  displayedColumns: string[] = ['socialNetwork'];

  constructor(private hotelService: HotelService, private messagesService: MessagesService) {}

  ngOnInit() {
    var myObject = {} as Hotel;
    var parametros = {} as ParameterHotel;

    this.hotel = myObject;
    this.hotel.socialNetworks = [];
    this.hotel.comforts = [];
    this.hotel.parameterize = parametros;

    this.hotelService.find().subscribe(
      (data) => {
        this.hotel = data;
        this.dataSource = data.socialNetworks;
        this.dataSourceComfort = data.comforts;
        console.log(this.dataSource);
      },
      (error) => {
        console.log('opss:', error);
        this.messagesService.showErrorMessage(Messages.get('retrieve_error', LABEL.hotel));
      }
    );
  }
}
