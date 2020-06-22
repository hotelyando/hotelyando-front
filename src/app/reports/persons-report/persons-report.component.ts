import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/general/reports/ExcelService';
import { Fecha } from 'src/app/general/shared/fecha';
import { Hotel } from 'src/app/general/shared/hotel';
import { HotelService } from 'src/app/general/shared/hotel.service';
import { Person } from 'src/app/rrhh/shared/person/person';
import { PersonService } from 'src/app/rrhh/shared/person/person.service';
import { isNull } from 'util';
import { ReportService } from '../shared/report.service';

const ELEMENT_DATA: Person[] = [];

@Component({
  selector: 'ho-persons-report',
  templateUrl: './persons-report.component.html',
  styleUrls: ['./persons-report.component.scss']
})
export class PersonsReportComponent implements OnInit {
  date = new FormControl(new Date());
  reportFilter: FormGroup;
  hotel: Hotel;
  fechaInicial: any = '4/1/2020';
  fechaFinal: any = '5/1/2020';
  showReport: boolean;

  displayedColumns: string[] = ['document', 'firstName', 'lastName', 'phone', 'email', 'country'];
  dataSource = ELEMENT_DATA;
  nationality: string = 'ALL';
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private excelService: ExcelService,
    private hotelService: HotelService
  ) {}

  ngOnInit() {
    this.hotelService.find().subscribe((data) => {
      this.hotel = data;
    });

    this.reportFilter = this.formBuilder.group({
      endDate: [new Date(), Validators.required],
      initialDate: [new Date(), Validators.required],
      nationality: [new Date(), Validators.required]
    });

    var date = new Date();
    date.setDate(date.getDate() - 1);

    this.fechaFinal = Fecha.DateToYYYYMMDD(new Date());
    console.log('date:' + date);
    this.fechaInicial = Fecha.DateToYYYYMMDD(date);
    this.personService.listSale(this.nationality, this.fechaInicial, this.fechaFinal).subscribe(
      (data) => {
        this.dataSource = data;
        if (this.dataSource.length > 0) {
          this.showReport = true;
        }
      },
      (error) => {}
    );
  }

  onSubmit() {
    this.fechaFinal = Fecha.DateToYYYYMMDD(this.fechaFinal);
    this.fechaInicial = Fecha.DateToYYYYMMDD(this.fechaInicial);

    if (!isNull(this.fechaFinal && !isNull(this.fechaInicial))) {
      this.personService.listSale(this.nationality, this.fechaInicial, this.fechaFinal).subscribe(
        (data) => {
          this.dataSource = data;
          if (!isNull(this.dataSource) && this.dataSource.length > 0) {
            this.showReport = true;
          } else {
            this.showReport = false;
          }
        },
        (error) => {}
      );
    }
  }

  exportAsXLSX(): void {
    const fechaExport = new Date();

    this.router.navigate([
      '/' +
        this.excelService.exportAsExcelFileRoute(
          ReportService.convertPersonToMigration({ val: this.dataSource, hotel: this.hotel }),
          'clientes' + fechaExport,
          'personsReport'
        )
    ]);
  }
}
