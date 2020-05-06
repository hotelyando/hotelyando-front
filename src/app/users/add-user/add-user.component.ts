import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOption, MatSelectChange } from '@angular/material';
import { Router } from '@angular/router';
import { DocumentType, DOCUMENT_TYPES } from 'src/app/clients/shared/document-type';
import { Messages } from 'src/app/general/messages';
import { Country } from 'src/app/general/shared/country';
import { CountryService } from 'src/app/general/shared/country.service';
import { LABEL } from 'src/app/general/shared/label';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { State, STATES } from 'src/app/general/shared/state';
import { Person } from 'src/app/persons/shared/person';
import { PersonService } from 'src/app/persons/shared/person.service';
import { Rol } from '../shared/rol';
import { RolService } from '../shared/rol.service';
import { User } from '../shared/user';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  // public githubAutoComplete$: Observable<Person> = null;
  //public autoCompleteControl = new FormControl();
  //https://github.com/mainawycliffe/angular-material-autocomplete-with-http-service-demo/blob/master/src/app/services/github.service.ts
  //https://codinglatte.com/posts/angular/ng-material-autocomplete-http-lookup/
  rol: string;
  person: string;
  estados: State[];
  pais: string;
  typeDocumentValue: string;
  personID: string;

  estado: string;
  usuario: User;
  userForm: FormGroup;
  personForm: FormGroup;
  tipoDocumento: DocumentType;
  documentTypes: DocumentType[];
  countries: Country[];
  personaSave: Person;
  usuarioSave: User;

  roles: Rol[];
  persons: Person[];

  filteredPersons: Person[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private rolService: RolService,
    private personService: PersonService,
    private countryService: CountryService,
    private messagesService: MessagesService
  ) {}

  ngOnInit() {
    this.personForm = this.formBuilder.group({
      documentType: [null, Validators.required],
      document: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null],
      email: [null, Validators.email],
      //  phone: [null, Validators.required],
      cellphone: [null, Validators.required],
      // birthdate: [null, Validators.required],
      country: [null, Validators.required]
    });

    this.estados = STATES;
    this.documentTypes = DOCUMENT_TYPES;

    this.userForm = this.formBuilder.group({
      user: [null, Validators.email],
      clave: [null, Validators.required],
      rol: [null, Validators.required],
      state: [null, Validators.required]
    });

    this.rolService.list().subscribe((data) => {
      this.roles = data;
    });
    this.countryService.list().subscribe((data) => {
      this.countries = data;
    });

    this.filterPersons();
  }

  setUser(personaId: string): User {
    if (this.userForm.valid) {
      let userForm: User = {
        user: this.userForm.get('user').value,
        password: this.userForm.get('clave').value,
        rol: this.userForm.get('rol').value,
        state: this.userForm.get('state').value,
        registrationDate: '',
        hotelId: '',
        personId: personaId,
        uuid: '1'
      };
      return userForm;
    } else {
      this.messagesService.showErrorMessage(Messages.get('dataFormError', LABEL.user));
      return null;
    }
  }

  setPerson(): Person {
    if (this.personForm.valid) {
      let personaForm: Person = {
        document: this.personForm.get('document').value,
        documentType: this.personForm.get('documentType').value,
        country: {
          code: '',
          name: this.pais,
          uuid: this.personForm.get('country').value
        },

        cellPhone: this.personForm.get('cellphone').value,
        email: this.personForm.get('email').value,
        lastName: this.personForm.get('lastName').value,
        firstName: this.personForm.get('firstName').value,
        uuid: ''
      };
      return personaForm;
    } else {
      this.messagesService.showErrorMessage(Messages.get('dataFormError', LABEL.person));

      return null;
    }
  }

  guardar() {
    let persona = this.setPerson();

    if (persona != null && this.personID == null) {
      this.personService.add(persona).subscribe(
        (data) => {
          this.personaSave = data;

          if (this.personaSave.uuid != null) {
            this.userService.add(this.setUser(this.personaSave.uuid)).subscribe(
              (data) => {
                this.usuarioSave = data;
                if (this.usuarioSave.uuid != null) {
                  this.messagesService.showSuccessMessage(Messages.get('insert_success', LABEL.user));

                  this.router.navigate([`/app/users/list`]);
                }
              },
              (err) => {
                this.personService.delete(this.personaSave).subscribe(
                  (data) => {
                    this.messagesService.showErrorMessage(Messages.get('insert_error', LABEL.user, ''));
                  },
                  (error) => {
                    this.messagesService.showErrorMessage(Messages.get('delete_error', LABEL.person, error));
                  }
                );
              }
            );
          }
        },
        (error) => {
          this.messagesService.showErrorMessage(Messages.get('insert_error', LABEL.user, error));
        }
      );
    } else {
      let user = this.setUser(this.personID);

      if (user != null) {
        this.userService.add(user).subscribe(
          (data) => {
            this.usuarioSave = data;
            this.messagesService.showSuccessMessage(Messages.get('insert_success', LABEL.user));
            this.router.navigate([`/app/users/list`]);
          },
          (error) => {
            this.messagesService.showErrorMessage(Messages.get('insert_error', LABEL.user, error));
          }
        );
      }
    }
  }

  changeCountry(event: MatSelectChange) {
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    this.pais = selectedData.text;
  }

  changeTypeDocument(event: MatSelectChange) {
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    this.typeDocumentValue = selectedData.value;
  }

  changeEmail() {
    if (!this.personForm.get('email').invalid) {
      const confirmMessage = Messages.get('setEmailtoLogin', this.personForm.get('email').value);
      this.messagesService.showConfirmMessage(confirmMessage).subscribe((shouldDelete) => {
        this.userForm.reset();
        if (shouldDelete) {
          if (this.userForm.get('user').value == null) {
            this.userForm.setValue({
              user: this.personForm.get('email').value,
              clave: this.userForm.get('clave').value,
              rol: this.userForm.get('rol').value,
              state: this.userForm.get('state').value
            });
          } else {
            this.userForm.setValue({
              user: null,
              clave: this.userForm.get('clave').value,
              rol: this.userForm.get('rol').value,
              state: this.userForm.get('state').value
            });
          }
        }
      });
    }
  }

  private filterPersons() {
    this.personForm.get('document').valueChanges.subscribe((personVal) => {
      this.personService.findDocument(this.typeDocumentValue, personVal).subscribe((data) => {
        this.filteredPersons = data;
        if (this.filteredPersons.length > 0) {
          this.personForm.patchValue({
            firstName: this.filteredPersons[0].firstName,
            lastName: this.filteredPersons[0].lastName,
            email: this.filteredPersons[0].email,
            cellphone: this.filteredPersons[0].cellPhone,
            country: this.filteredPersons[0].country.name
          });
          this.personID = this.filteredPersons[0].uuid;
        } else {
          this.personForm.patchValue({
            firstName: '',
            lastName: '',
            email: '',
            cellphone: '',
            country: ''
          });
          this.personID = null;
        }
      });
    });
  }
}
