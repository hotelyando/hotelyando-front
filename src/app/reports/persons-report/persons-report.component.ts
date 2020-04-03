import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExcelService } from 'src/app/general/reports/ExcelService';
import { Person } from 'src/app/persons/shared/person';
import { PersonService } from 'src/app/persons/shared/person.service';
import { isNull } from 'util';

const ELEMENT_DATA: Person[] = [];

@Component({
  selector: 'ho-persons-report',
  templateUrl: './persons-report.component.html',
  styleUrls: ['./persons-report.component.scss']
})
export class PersonsReportComponent implements OnInit {
  date = new FormControl(new Date());
  reportFilter: FormGroup;
  fechaInicial: any;
  fechaFinal: any;
  nationality: string;

  showReport: boolean;

  displayedColumns: string[] = ['document', 'firstName', 'lastName', 'phone', 'email', 'country'];
  dataSource = ELEMENT_DATA;

  constructor(private formBuilder: FormBuilder, private personService: PersonService, private excelService: ExcelService) {}

  ngOnInit() {
    this.fechaInicial = new Date();
    this.fechaFinal = new Date();
    this.nationality = 'OUTSIDE';

    this.reportFilter = this.formBuilder.group({
      endDate: [null, Validators.required],
      initialDate: [null, Validators.required]
    });
    this.personService.listSale(this.nationality, this.fechaInicial, this.fechaFinal).subscribe(data => {
      this.dataSource = data;
      if (this.dataSource.length > 0) {
        this.showReport = true;
      }
    });
  }

  onSubmit() {
    console.log('>>fecha Inicial>>>', this.fechaInicial);
    console.log('>>fecha Final>>>', this.fechaFinal);

    if (!isNull(this.fechaFinal && !isNull(this.fechaInicial))) {
      this.personService.listSale(this.nationality, this.fechaInicial, this.fechaFinal).subscribe(data => {
        this.dataSource = data;
      });

      if (this.dataSource.length > 0) {
        this.showReport = true;
      } else {
        this.showReport = false;
      }
    }
  }

  exportAsXLSX(): void {
    const fechaExport = new Date();
    this.excelService.exportAsExcelFile(this.dataSource, 'clientes' + fechaExport);
  }
}
