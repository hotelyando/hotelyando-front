import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Messages } from 'src/app/general/messages';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { PriceDetail, RoomType } from '../../shared/room';
import { RoomService } from '../../shared/room.service';
import { PriceDetailComponent } from '../price-detail/price-detail.component';

@Component({
  selector: 'ho-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.scss']
})
export class RoomTypeComponent implements OnInit {
  roomTypeForm: FormGroup;

  priceDetails: PriceDetail[] = [];
  dataSource: MatTableDataSource<PriceDetail>;

  displayedColumns: string[] = ['day', 'priceDay', 'priceHour', 'startTime', 'endTime', 'holiday', 'remove'];

  priceDetailVisible = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private roomService: RoomService,
    private messagesService: MessagesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.roomTypeForm = this.formBuilder.group({
      uuid: [null],
      description: [null, Validators.required],
      priceDay: [null, Validators.required],
      priceHour: [null, Validators.required]
    });
    this.dataSource = new MatTableDataSource(this.priceDetails);

    this.loadRoomType();
  }

  loadRoomType() {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (uuid) {
      this.roomService.getRoomType(uuid).subscribe((roomType) => {
        if (roomType) {
          console.log('tipo habitación', roomType);
          this.roomTypeForm.reset(roomType, { emitEvent: false });
          this.dataSource = new MatTableDataSource(roomType.priceDetails);
        }
      });
    }
  }

  removePriceDetail(index: number) {
    this.dataSource.data.splice(index, 1);
    this.dataSource.filter = '';
  }

  openDialog(): void {
    console.log('open dialog');

    const dialogRef = this.dialog.open(PriceDetailComponent, {
      // width: '250px',
      data: null
    });

    // const dialogRef = this.dialog.open(PriceDetailComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  save() {
    console.log('guardar tipo h!!!');

    if (!this.roomTypeForm.valid) {
      const e = this.roomTypeForm.errors;
      console.log('errores', e);
      return;
    }

    console.log('guardar tipo h 1 * !!!');

    const roomType: RoomType = this.getInfoRoomType();
    this.roomService.saveType(roomType).subscribe(
      () => this.messagesService.showSuccessMessage(Messages.get('priceDetail_save_success')),
      (error) => this.messagesService.showErrorMessage(error.message)
    );
  }

  getInfoRoomType(): RoomType {
    const valuesRoom = this.roomTypeForm.value;
    return {
      uuid: valuesRoom.uuid,
      description: valuesRoom.description,
      priceDay: valuesRoom.priceDay,
      priceHour: valuesRoom.priceHour,
      priceDetails: this.dataSource.data
    } as RoomType;
  }

  showPriceDetail() {
    this.priceDetailVisible = true;
  }

  setPriceDetail(priceDetail: PriceDetail) {
    if (priceDetail) {
      this.dataSource.data.push(priceDetail);
      this.dataSource.filter = '';
    }
    this.priceDetailVisible = false;
  }

  hasCustomPrices(): boolean {
    return this.dataSource && this.dataSource.data.length > 0;
  }
}
