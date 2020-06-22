import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Person } from 'src/app/persons/shared/person';
import { PersonService } from 'src/app/persons/shared/person.service';
import { Client, SaleState } from '../shared/sale';

@Component({
  selector: 'ho-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  saleForm: FormGroup;

  clients: Observable<Person[]>;

  constructor(private formBuilder: FormBuilder, private personService: PersonService) {}

  ngOnInit() {
    this.saleForm = this.formBuilder.group({
      uuid: [null],
      date: [null],
      state: [SaleState.COTIZACION],
      client: [null, Validators.required],
      values: [null],
      items: [null],
      rooms: [null]
    });

    this.clients = this.personService.findAll();
  }

  getClientDescription(client: Client) {
    return 'nombreCliente';
  }
}
