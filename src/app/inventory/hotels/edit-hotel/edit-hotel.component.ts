import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Messages } from 'src/app/general/messages';
import { Hotel } from 'src/app/general/shared/hotel';
import { HotelService } from 'src/app/general/shared/hotel.service';
import { LABEL } from 'src/app/general/shared/label';
import { MessagesService } from 'src/app/general/shared/messages.service';

@Component({
  selector: 'ho-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.scss']
})
export class EditHotelComponent implements OnInit {
  hotel: Hotel;
  editFormHotel: FormGroup;
  redes = new FormArray([]);
  redesSociales = [];

  constructor(
    private hotelService: HotelService,
    private router: Router,
    private messagesService: MessagesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.editFormHotel = this.formBuilder.group({
      name: [null, Validators.required],
      address: [null, Validators.required],
      altitude: [null, Validators.required],
      cellPhone: [null, Validators.required],
      email: [null, Validators.email],
      latitude: [null, Validators.required],
      nit: [null, Validators.required],
      logo: [null, Validators.required],
      checkIn: [null, Validators.required],
      checkOut: [null, Validators.required],
      taxPercentage: [0, Validators.required],
      timeReservation: [0, Validators.required],
      phone: [null, Validators.required]
    });

    this.hotelService.find().subscribe(
      (data) => {
        this.hotel = data;

        data.socialNetworks.forEach((element) => {
          this.redes.push(new FormControl(element));
        });

        this.editFormHotel = this.formBuilder.group({
          name: [data.name, Validators.required],
          address: [data.address, Validators.required],
          altitude: [data.altitude, Validators.required],
          cellPhone: [data.cellPhone, Validators.required],
          email: [data.email, Validators.email],
          latitude: [data.latitude, Validators.required],
          nit: [data.nit, Validators.required],
          logo: [data.logo, Validators.required],
          checkIn: [data.parameterize.checkIn, Validators.required],
          checkOut: [data.parameterize.checkOut, Validators.required],
          taxPercentage: [data.parameterize.taxPercentage, Validators.required],
          timeReservation: [data.parameterize.timeReservation, Validators.required],
          phone: [data.phone, Validators.required]
        });
      },
      (error) => {
        console.log('opss:', error);
        this.messagesService.showErrorMessage(Messages.get('retrieve_error', LABEL.hotel));
      }
    );
  }

  setHotel() {
    this.hotel = {
      address: this.editFormHotel.get('address').value,
      altitude: this.editFormHotel.get('altitude').value,
      cellPhone: this.editFormHotel.get('cellPhone').value,
      email: this.editFormHotel.get('email').value,
      latitude: this.editFormHotel.get('latitude').value,
      name: this.editFormHotel.get('name').value,
      nit: this.editFormHotel.get('nit').value,
      logo: this.editFormHotel.get('logo').value,
      parameterize: {
        checkIn: this.editFormHotel.get('checkIn').value,
        checkOut: this.editFormHotel.get('checkOut').value,
        dataInformation: '',
        payingTaxes: true,
        taxPercentage: this.editFormHotel.get('taxPercentage').value,
        timeReservation: this.editFormHotel.get('timeReservation').value
      },
      phone: this.editFormHotel.get('phone').value,
      socialNetworks: this.listRedes(),
      state: true,
      uuid: ''
    };
  }
  addRed() {
    this.redes.push(new FormControl(''));
  }
  removeRed(indice: number) {
    this.redes.removeAt(indice);
  }

  listRedes(): string[] {
    let datos = [];
    this.redes.controls.forEach((element) => {
      console.log(element.value);
      if (element.value != null && element.value.replace(/\s/g, '') != '') {
        datos.push(element.value);
      }
    });
    return datos;
  }

  edit() {
    if (this.editFormHotel.invalid) {
      this.messagesService.showErrorMessage(Messages.get('dataFormError', LABEL.hotel));
      return;
    }

    this.setHotel();

    this.hotelService.edit(this.hotel).subscribe(
      (data) => {
        this.messagesService.showSuccessMessage(Messages.get('edit_success', LABEL.hotel));
      },
      (error) => {
        this.messagesService.showErrorMessage(Messages.get('edit_error', LABEL.hotel, error));
      }
    );
  }
  cancel() {
    this.router.navigate([`/app/hotel/show`]);
  }
}
