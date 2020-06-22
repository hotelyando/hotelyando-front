import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Person } from 'src/app/rrhh/shared/person/person';
import { PersonService } from 'src/app/rrhh/shared/person/person.service';
import { Client } from '../shared/client';
import { Sale, SaleState } from '../shared/sale';
import { SaleService } from '../shared/sale.service';

@Component({
  selector: 'ho-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  saleForm: FormGroup;

  clients: Observable<Person[]>;

  sale: Sale;

  constructor(private formBuilder: FormBuilder, private personService: PersonService, private saleService: SaleService) {}

  ngOnInit(): void {
    this.sale = this.saleService.createNewSale();

    this.saleForm = this.formBuilder.group({
      uuid: [null],
      date: [null],
      state: [SaleState.COTIZACION],
      client: [null, Validators.required],
      values: [null],
      items: [null],
      rooms: [null]
    });
  }

  getClientDescription(client: Client) {
    return 'nombreCliente';
  }
}
