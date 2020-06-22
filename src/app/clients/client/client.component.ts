import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/general/shared/country/country';
import { DocumentType, DOCUMENT_TYPES_LIST } from 'src/app/rrhh/shared/person/document-type';

@Component({
  selector: 'ho-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clientForm: FormGroup;
  documentTypes: DocumentType[];
  countries: Country[] = [
    { code: 'CO', name: 'Colombia' },
    { code: 'US', name: 'Estados Unidos' }
  ];
  filteredCountries: Country[];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      uuid: [null, Validators.required],
      documentType: [null, Validators.required],
      document: [null, Validators.required],
      name: [null, Validators.required],
      email: [null, Validators.required, Validators.email],
      bithdate: [null, Validators.required],
      phone: [null, Validators.required],
      country: [null, Validators.required]
    });
    this.documentTypes = DOCUMENT_TYPES_LIST;

    this.filteredCountries = this.countries;
    this.filterCountries();
  }

  private filterCountries() {
    this.clientForm.get('country').valueChanges.subscribe((countryVal) => {
      this.filteredCountries = this.countries.filter((option) => option.name.toLowerCase().includes(countryVal.toLowerCase()));
    });
  }

  guardar() {
    // const cf: Client = {
    //   uuid: this.clientForm.get('uuid').value,
    //   documentType: CEDULA,
    //   document: this.clientForm.get('document').value,
    //   name: this.clientForm.get('name').value,
    //   email: this.clientForm.get('email').value,
    //   bithdate: this.clientForm.get('bithdate').value,
    //   phone: this.clientForm.get('phone').value,
    //   country: null
    // };
    // console.log('guardar cliente', cf);
  }
}
