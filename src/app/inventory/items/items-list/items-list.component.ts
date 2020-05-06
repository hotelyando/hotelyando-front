import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { messages } from 'src/app/general/messages';
import { State } from 'src/app/general/shared/state';
import { Item } from '../../shared/item';
import { ItemService } from '../../shared/item.service';

const ELEMENT_DATA: Item[] = [];

@Component({
  selector: 'ho-users-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'quantity',
    'price',
    'stock',
    'icoPercentage',
    'ivaPercentage',
    'taxPercentage',
    'activate',
    'edit'
  ];

  estados: State[];

  itemColumnDescription = messages.itemColumnDescription;

  dataSource = new MatTableDataSource<Item>(ELEMENT_DATA);

  constructor(private router: Router, private itemService: ItemService) {}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit() {
    this.itemService.list().subscribe((data) => {
      let listaItems = data;

      this.dataSource = new MatTableDataSource<Item>(listaItems);
      this.dataSource.paginator = this.paginator;
    });
  }

  editar(id: string) {
    this.router.navigate([`/app/items/edit/${id}`]);
  }
}
