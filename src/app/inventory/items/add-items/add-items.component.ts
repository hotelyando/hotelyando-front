import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Messages } from 'src/app/general/messages';
import { LABEL } from 'src/app/general/shared/label';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { State, STATES } from 'src/app/general/shared/state';
import { Item } from '../../shared/item';
import { ItemService } from '../../shared/item.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.scss']
})
export class AddItemsComponent implements OnInit {
  item: Item;
  submitted: boolean;
  addFormItem: FormGroup;
  estados: State[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private messagesService: MessagesService
  ) {}

  ngOnInit() {
    this.estados = STATES;

    this.addFormItem = this.formBuilder.group({
      description: [null, Validators.required],
      quantity: [null, Validators.required],
      stock: [null, Validators.required],
      active: [null, Validators.required],
      name: [null, Validators.required],
      price: [null, Validators.required],
      icoPercentage: [null, Validators.required],
      ivaPercentage: [null, Validators.required],
      taxPercentage: [null, Validators.required]
    });
  }

  onSubmit() {
    if (!this.addFormItem.valid) {
      this.messagesService.showErrorMessage(Messages.get('dataFormError', LABEL.item));
      return;
    }

    const cf: Item = {
      price: this.addFormItem.get('price').value,
      stock: this.addFormItem.get('stock').value,
      description: this.addFormItem.get('description').value,
      quantity: this.addFormItem.get('quantity').value,
      state: this.addFormItem.get('active').value,
      name: this.addFormItem.get('name').value,
      hotelId: '',
      uuid: '0',
      icoPercentage: this.addFormItem.get('icoPercentage').value,
      ivaPercentage: this.addFormItem.get('ivaPercentage').value,
      taxPercentage: this.addFormItem.get('taxPercentage').value
    };

    this.itemService.add(cf).subscribe(
      (data) => {
        this.messagesService.showSuccessMessage(Messages.get('insert_success', LABEL.item));
        this.router.navigate([`/app/items/list`]);
      },
      (err) => {
        this.messagesService.showErrorMessage(Messages.get('insert_error', LABEL.item));
      }
    );
  }
}
