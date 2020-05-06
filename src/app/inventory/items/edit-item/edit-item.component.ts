import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Messages } from 'src/app/general/messages';
import { LABEL } from 'src/app/general/shared/label';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { State, STATES } from 'src/app/general/shared/state';
import { Item } from '../../shared/item';
import { ItemService } from '../../shared/item.service';

@Component({
  selector: 'ho-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  id: string;
  item: Item;
  updated: boolean;
  editFormItem: FormGroup;
  estados: State[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private messagesService: MessagesService
  ) {}

  ngOnInit() {
    this.estados = STATES;
    this.editFormItem = this.formBuilder.group({
      description: [null, Validators.required],
      quantity: [null, Validators.required],
      stock: [0, Validators.required],
      active: [null, Validators.required],
      name: [null, Validators.required],
      price: [0, Validators.required],
      icoPercentage: [0, Validators.required],
      ivaPercentage: [0, Validators.required],
      taxPercentage: [0, Validators.required]
    });

    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.itemService.find(this.id).subscribe((data) => {
      this.item = data;
      this.editFormItem.reset();
      let i = 0;
      let indice = 0;
      this.estados.forEach((element) => {
        if (this.item.state == element.code) {
          indice = i;
        }
        i++;
      });

      this.editFormItem = this.formBuilder.group({
        description: [this.item.description, Validators.required],
        quantity: [this.item.quantity],
        stock: [this.item.stock, Validators.required],
        active: [this.estados[indice], Validators.required],
        name: [this.item.name, Validators.required],
        price: [this.item.price, Validators.required],
        icoPercentage: [this.item.icoPercentage, Validators.required],
        ivaPercentage: [this.item.ivaPercentage, Validators.required],
        taxPercentage: [this.item.taxPercentage, Validators.required]
      });
    });
  }

  seItem(): Item {
    if (!this.editFormItem.invalid) {
      console.log(this.editFormItem.get('active').value.code);
      let addForm: Item = {
        state: this.editFormItem.get('active').value.code,
        description: this.editFormItem.get('description').value,
        hotelId: this.item.hotelId,
        price: this.editFormItem.get('price').value,
        quantity: this.editFormItem.get('quantity').value,
        stock: this.editFormItem.get('stock').value,
        uuid: this.item.uuid,
        name: this.editFormItem.get('name').value,
        icoPercentage: this.editFormItem.get('icoPercentage').value,
        ivaPercentage: this.editFormItem.get('ivaPercentage').value,
        taxPercentage: this.editFormItem.get('taxPercentage').value
      };
      return addForm;
    } else {
      this.messagesService.showErrorMessage(Messages.get('dataFormError', LABEL.item));
      return null;
    }
  }

  onSave() {
    let itemEdit = this.seItem();
    if (itemEdit != null) {
      this.itemService.edit(itemEdit).subscribe(
        (data) => {
          this.item = data;
          this.messagesService.showSuccessMessage(Messages.get('edit_success', LABEL.item));
          this.router.navigate([`/app/items/list`]);
        },
        (error) => {
          this.messagesService.showErrorMessage(Messages.get('edit_error', LABEL.item, error));
        }
      );
    }
  }
}
