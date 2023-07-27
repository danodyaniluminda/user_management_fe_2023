import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

const TABLE_MANAGEMENT = environment.graduation_completion + '/api/graduation-completion/table-management/';


@Injectable({
  providedIn: 'root'
})
export class TableManagementService {

  completionTableList: any;

  constructor(private http: HttpClient) {  }


 // File Upload when click upload button (Parse jsonData object)
 uploadFile(data: any,selectedTable:any) {
  if (selectedTable.upload == true && data && data.length > 0) {
    console.log(data);
    const requestPayload = data;
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const newLocal = TABLE_MANAGEMENT + `Updatetables/${selectedTable.name}`;

    this.http.post(newLocal, requestPayload, {
      headers: headers,
      responseType: 'text'
    })
    .toPromise()
    .then(response => {
      console.log(response);
      Swal.fire({
        title: 'Success!',
        text: 'Table Uploaded Successfully.',
        icon: 'success',
      }).then(() => {
        location.reload();
      });
    })
    .catch(error => {
      console.log(error);
      Swal.fire('Error...', 'An error occurred.', 'error');
    });
  } else {
    Swal.fire('Error...', 'Select Correct Table or Excel File ', 'error');
    console.log('Error sending to the backend');
  }
}
//Get Completion Table List ( used filter for show only valid== true)
getTables(): Observable<any[]> {
  
  return this.http.get<any[]>(TABLE_MANAGEMENT + 'GetAllTables')
    .pipe(
      map(completionTableList => completionTableList.filter(item => item.valid === true))
    );
}
  downloadTable(tableName: string): Observable<any[]> {
    return this.http.get<any[]>(TABLE_MANAGEMENT+`downloadtables/${tableName}`);
  }
  }





