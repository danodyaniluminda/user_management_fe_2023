import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableManagementService {

  completionTableList: any;

  constructor(private http: HttpClient) {  }



  uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();
   

    this.http.post('http://localhost:8099/api/graduation-completion/table-management/Updatetables/', formData, { headers: headers })
      .subscribe(
        response => {
          console.log('File uploaded successfully!', response);
  
        },
        error => {
          console.error('Error uploading file:', error);

        }
      );
  }

  getTables() {
   
        this.http.get<any[]>('http://localhost:8099/api/graduation-completion/table-management/tables').subscribe(
          (completionTableList: any[]) => {
            this.completionTableList = completionTableList;
            console.log(this.completionTableList);
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }
  }





