import {Component, OnInit, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {AddNewCompletionService} from "./completion-module.service";
import {Router} from "@angular/router";
import {ReplaySubject, Subject, takeUntil} from "rxjs";
import {FormControl} from "@angular/forms";

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'completion-completion-module',
  templateUrl: './completion-module.component.html',
  styleUrls: ['./completion-module.component.css']
})
export class CompletionModuleComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  showTable: Boolean = false;
  addButtonDisabled: boolean = true;


  jsonData = {
    data: [
      { applicationId: 463563, courseId: 5728 },
      { applicationId: 463019, courseId: 447 },
      { applicationId: 463711, courseId: 5728 },
      { applicationId: 463928, courseId: 447 }
    ]
  };
  constructor(
    private addNewCompletionService: AddNewCompletionService,
    private router: Router
  ) {
  }

  programmeId: number = -1;
  programmes: any[];

  public filteredProgrammes: ReplaySubject<any> = new ReplaySubject<any>(1);
  public programmeFilterCtrl: FormControl = new FormControl('');
  protected _onDestroy = new Subject<void>();

  ngOnInit(): void {
    this.fetchAllProgrammes();

    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: false,
      paging: true,
    };

  }

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData.data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelData, 'data.xlsx');
  }



  fetchAllProgrammes() {
    this.addNewCompletionService
      .getAllProgrammes()
      .toPromise()
      .then((result: any) => {
        this.filteredProgrammes.next(this.programmes);
        console.log("All-programmes", result);
        this.programmes = result;
        //this.programmeId = this.programmes[0].id;
      })
      .catch((exception: any) => {
        alert(exception);
      });
  }

  programmeChange(target: any) {
  this.programmeId = target.value;
  console
.

  log(this

.
  programmes
);

  this
.
  filteredProgrammes
.

  next(this

.
  programmes
);
  this
.
  programmeFilterCtrl
.
  valueChanges
.

  pipe(takeUntil

(
  this
.
  _onDestroy
))
.

  subscribe(

() => {
  this
.

  filterProgrammes();
}

)
;
}

filterProgrammes()
{
  if (!this.programmes) {
    return;
  }
  let search = this.programmeFilterCtrl.value;
  if (!search) {
    this.filteredProgrammes.next(this.programmes.slice());
    return;
  } else {
    search = search.toLowerCase();
  }
  this.filteredProgrammes.next(
    this.programmes.filter((programme: {
      programName: string;
    }) => programme.programName.toLowerCase().indexOf(search) > -1)
  );
}


addNewProgram()
{

}


run(id
:
number
)
{

}

camelCaseText(word
:
string
):
string
{
  const words = word.split(' ');

  const camelCaseWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return camelCaseWords.join(' ');
}


}

