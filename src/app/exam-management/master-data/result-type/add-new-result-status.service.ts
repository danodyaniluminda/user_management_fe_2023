import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

const GENERATE_STATUS_API = environment.base_url +'/api/v1/transcript_admin/';

@Injectable({
  providedIn: 'root'
})
export class AddNewResultStatusService {

  constructor(private http: HttpClient) { }

  getAllResultStatus(): Observable<any> {

    let result = this.http.get(GENERATE_STATUS_API + 'trancript_result_type/get_all_trancript_result_type');
    return new Observable(observable => {
      observable.next(result.toPromise().then((result: any) => {
        console.log("Result Status : ", result);
        observable.next(result);
        observable.complete();
      })
        .catch(error => {
          observable.next((error['error'].message));
          observable.complete();
        }));
    });


  }


  addNewResultStatus(name:string, no:string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    let queryParams = new HttpParams();
    console.log(name)
    console.log(no)


    let bodyJson = {
      "name":name,
      "no":no,

    }
    let result = this.http.post(GENERATE_STATUS_API + 'trancript_result_type/add_new_trancript_result_type',bodyJson ,{ headers: headers, responseType: 'text'});
    return new Observable(observable => {
      observable.next(result.toPromise().then((result: any) => {
        console.log("Result: ", result);

        if(result.toLowerCase().trim().startsWith("success")){
          observable.next(result);
          observable.next(result);
          observable.complete();
          Swal.fire('Success...','Record Added Successfully', 'success');
          setTimeout(() =>{ location.reload();},3000);
        }else{
          Swal.fire('Error...','error', 'error');
        }

      })
        .catch(error => {
          observable.next((error['error'].message));
          Swal.fire('Error...','error', 'error');
          observable.complete();
          location.reload();
        }));
    });


  }

  searchResponseToAPI() : Observable<any> {
    // console.log(form.value);
    let result = this.http.post(GENERATE_STATUS_API + 'trancript_result_type/find_trancript_result_type', {
      responseType: 'json',
    });

    return new Observable((observable) => {
      observable.next(
        result
          .toPromise()
          .then((result: any) => {
            observable.next(result);
            observable.complete();
            // observable.next('success:Your account has been created successfully. Please check the email to find the username and password.');

          })
          .catch((error) => {
            console.log(error);
            observable.next(error['error']);
            observable.complete();
          })
      );
    });
  }

  archiveResultStatus(id:number): Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id",id);
    let result = this.http.get(GENERATE_STATUS_API + 'trancript_result_type/archive_transcript_result_type' ,{params:queryParams,responseType: 'text'});
    return new Observable(observable => {
      observable.next(result.toPromise().then((result: any) => {
        console.log("Result: ", result);

        if(result.toLowerCase().trim().startsWith("success")){
          // Swal.fire('Success...','Record Deleted Successfully', 'success');
          observable.next(result);
          observable.next(result);
          observable.complete();
          setTimeout(() =>{ location.reload();},3000);
        }else{
          Swal.fire('Error...','error', 'error');
        }

      })
        .catch(error => {
          observable.next((error['error'].message));
          Swal.fire('Error...','error', 'error');
          observable.complete();
          location.reload();
        }));
    });
  }

}
