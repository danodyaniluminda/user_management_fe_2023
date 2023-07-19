import {Component, OnInit, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {AddNewCompletionService} from "./completion-module.service";
import {Router} from "@angular/router";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'completion-completion-module',
  templateUrl: './completion-module.component.html',
  styleUrls: ['./completion-module.component.css']
})
export class CompletionModuleComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  resultStatuses: any[] = [];
  resultStatus: any[];
  resultStatusName:string;
  resultStatusNo:string;
  showTable: Boolean = false;
  addButtonDisabled :boolean=true;
  jsonData = {
    data: [
      { applicationId: 463563, courseId: 5728 },
      { applicationId: 463019, courseId: 447 },
      { applicationId: 463711, courseId: 5728 },
      { applicationId: 463928, courseId: 447 }
    ]
  };
  constructor(
    private addNewCompletionService:AddNewCompletionService,
    private router:Router
  ) { }


  ngOnInit(): void {
    this.fetchAllResultStatuss();
    this.search();

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
    saveAs(excelData, 'Not Converted Course List.xlsx');
  }


  fetchAllResultStatuss(){
    this.addNewCompletionService.getAllResultStatus()
      .toPromise()
      .then((result:any) => {
        this.resultStatuses = result;
      })
      .catch((exception:any) => {
        alert(exception);
      });
  }

  filterProgram($event:any){
    this.addButtonDisabled = false;
    let key = $event.target.value;
    let filtered = this.resultStatuses.filter(status => status.name.includes(key));
    console.log(filtered);

  }
  onResultTypeClick(){
    this.addButtonDisabled = false;
  }

  addNewProgram(){
    // if(this.resultStatusName==undefined || this.resultStatusName.trim().length==0){
    //   Swal.fire('Please enter the result type', 'Result type is empty!', 'error');
    //
    //   return;
    // }
    // this.resultStatusName = this.camelCaseText(this.resultStatusName.trim());
    //
    // let filteredresultStatuss = this.resultStatuses.filter((tt: {name:any, type: any}) => tt.name == this.resultStatusName.trim());
    // if(filteredresultStatuss.length>0){
    //   Swal.fire('Oops!', 'Entered details are already exists! ', 'error');
    //
    //   return;
    // }
    //
    // console.log("AddNewResultStatus -> " , this.resultStatusName + " & " + this.resultStatusNo);
    //
    // {
    //   this.addNewCompletionService.addNewResultStatus(this.resultStatusName,this.resultStatusNo)
    //     .toPromise()
    //     .then((result:any) => {
    //       console.log(result);
    //     })
    //     .catch((exception:any) => {
    //       alert(exception);
    //     });
    // }
  }

  search() {
    this.showTable=false;
    this.addNewCompletionService
      .searchResponseToAPI()
      .toPromise()
      .then((message: any) => {
        this.resultStatus = message;
        console.log("test",message);
        this.showTable = true;
      });
  }
  run(id:number) {

  }

  camelCaseText(word:string): string {
    const words = word.split(' ');

    const camelCaseWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    return camelCaseWords.join(' ');
  }


}

