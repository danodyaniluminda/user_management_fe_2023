import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'completion-table-management',
  templateUrl: './table-management.component.html',
  styleUrls: ['./table-management.component.css']
})
export class TableManagementComponent implements OnInit {
  selectedFileName: string | undefined;
  @ViewChild('fileInput') fileInput: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  browseTable() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log('File uploaded:', file);
    this.selectedFileName = file ? file.name : undefined;
    this.readFileContents(file);

  }

  readFileContents(file: File) {
    const fileReader = new FileReader();
  
    fileReader.onload = (event: any) => {
      const binaryData = event.target.result;
      const workbook = XLSX.read(binaryData, { type: 'binary' });
      workbook.SheetNames.forEach(sheet => {
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        console.log('Data from sheet', sheet, 'in JSON:', jsonData);
      });
    };
  
    fileReader.readAsBinaryString(file);
  }

  uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();
   

    this.http.post('YOUR_BACKEND_API_URL', formData, { headers: headers })
      .subscribe(
        response => {
          console.log('File uploaded successfully!', response);
  
        },
        error => {
          console.error('Error uploading file:', error);

        }
      );
  }
}
