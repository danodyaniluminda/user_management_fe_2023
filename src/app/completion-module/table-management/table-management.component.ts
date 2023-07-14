import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TableManagementService } from './table-management.service';
import * as XLSX from 'xlsx';

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
  
  constructor(private http: HttpClient, private tableManagementService: TableManagementService) { }

  ngOnInit(): void {
    this.getTables();
    console.log(this.completionTableList);
  }

  browseTable(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    console.log('File uploaded:', file);
    this.selectedFileName = file ? file.name : undefined;
    this.selectedFile = file;
    this.readFileContents(file);
  }

  readFileContents(file: File): void {
    const fileReader = new FileReader();
  
    fileReader.onload = (event: any) => {
      const binaryData = event.target.result;
      const workbook = XLSX.read(binaryData, { type: 'binary' });
      workbook.SheetNames.forEach(sheet => {
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        console.log('Data from sheet', sheet, 'in JSON:', jsonData);
        this.uploadFile(jsonData);
        const dataCount = jsonData.length;

        // Display the count in a label or any other element
        const labelElement = document.getElementById('dataCountLabel');
        if (labelElement) {
          labelElement.innerText = `Records in the File: ${dataCount}`;
        }

      });
    };
  
    fileReader.readAsBinaryString(file);
  }

  
  uploadFile(data: any[]): void {
    if (this.selectedTable && data && data.length > 0) {
      const requestPayload = { tableName: this.selectedTable.name, id: this.selectedTable.id, data };

      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');

      this.http.post<any>(`http://localhost:8099/api/graduation-completion/table-management/Updatetables/${this.selectedTable.name}/${this.selectedTable.id}`, requestPayload, { headers })
        .subscribe(
          response => {
            console.log('Tables updated successfully');
            // Handle success response
          },
          error => {
            console.error('Error occurred while updating tables:', error);
            // Handle error response
          }
        );
    } else{
       console.log('Not select Table ');
    }
  }

  getTables(): void {
    this.http.get<any[]>('http://localhost:8099/api/graduation-completion/table-management/GetAllTables').subscribe(
      completionTableList => {
        this.completionTableList = completionTableList;
        console.log(this.completionTableList);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  onTableSelect(): void {
    console.log('Selected Table:', this.selectedTable);
  }
}
