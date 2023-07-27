import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { TableManagementService } from './table-management.service';


const TABLE_MANAGEMENT = environment.graduation_completion + '/api/graduation-completion/table-management/';

@Component({
  selector: 'completion-table-management',
  templateUrl: './table-management.component.html',
  styleUrls: ['./table-management.component.css']
})
export class TableManagementComponent implements OnInit {
  selectedFileName: string | undefined;
  @ViewChild('fileInput') fileInput: any;
  completionTableList: any[];
  selectedTable: any;
  selectedFile: any;
  uploaData: unknown[];
  isFileSelected: boolean = false;



  constructor(private http: HttpClient, private tableManagementService: TableManagementService) { }

  ngOnInit(): void {
    this.getTables();

  }

  getTables(): void {
    this.tableManagementService.getTables().subscribe(
      
      completionTableList => {
        this.completionTableList = completionTableList;
        console.log(this.completionTableList)

      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  browseTable(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any): void {  // Select file using file Explorer when clicked Brows button
    const file = event.target.files[0];
    console.log('File uploaded:', file);
    this.selectedFileName = file ? file.name : undefined;
    this.selectedFile = file;
    this.readFileContents(file);
    const selectFileLabel = document.getElementById('selectFileLabel') as HTMLLabelElement | null;
    if (selectFileLabel) {
      selectFileLabel.innerText = 'Selected File Name: ' + this.selectedFileName || '';
    }
    this.isFileSelected = true;
  }

  readFileContents(file: File): void {   // Read the uploaded excel and convert it to json model object
    const fileReader = new FileReader();

    fileReader.onload = (event: any) => {
      const binaryData = event.target.result;
      const workbook = XLSX.read(binaryData, { type: 'binary' });
      workbook.SheetNames.forEach(sheet => {
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        console.log('Data from sheet', sheet, 'in JSON:', jsonData);
        this.checkForNullValues(jsonData);
        this.uploaData = jsonData;
        const dataCount = jsonData.length;

        // // display no of records in file
        // const labelElement = document.getElementById('dataCountLabel');
        // if (labelElement) {
        //   labelElement.innerText = `Records in the File: ${dataCount}`;
        // }



      });
    };

    fileReader.readAsBinaryString(file);
  }
  checkForNullValues(NullValue: any) {     // Check for null values in the excel 
    console.log(NullValue)
    for (const key in NullValue) {
      if (NullValue.hasOwnProperty(key) && (NullValue[key] === null || NullValue[key] === undefined)) {
        console.log('Found null value:');
        return true; // Found null value
      }
    }
    return false; // No null values found
  }
  uploadbutton() {
    this.tableManagementService.uploadFile(this.uploaData,this.selectedTable);
    this.selectedTable = ''

  }

  // Show Selected TAble in consol
  onTableSelect(): void {
    console.log('Selected Table:', this.selectedTable);
  }

  clearTable(): void {
    this.selectedTable = null;
    this.selectedFileName = undefined;
    this.selectedFile = null;
    this.uploaData = [];
    this.isFileSelected = false;

    // Reset the file input element
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }

    const selectFileLabel = document.getElementById('selectFileLabel') as HTMLLabelElement | null;
    if (selectFileLabel) {
      selectFileLabel.innerText = '';
    }
  }
}
