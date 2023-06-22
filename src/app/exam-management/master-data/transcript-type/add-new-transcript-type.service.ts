import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

const GENERATE_TRANSCRIPT_API = environment.base_url + '/api/v1/transcript_admin/';

@Injectable({
  providedIn: 'root'
})
export class AddNewTranscriptTypeService {

  constructor(private http: HttpClient) { }

  getAllTranscriptType(): Observable<any> {

    let result = this.http.get(GENERATE_TRANSCRIPT_API + 'transcript_type/get_all_transcript_types');
    return new Observable(observable => {
      observable.next(result.toPromise().then((result: any) => {
        console.log("Transcript Types : ", result);
        observable.next(result);
        observable.complete();
      })
        .catch(error => {
          observable.next((error['error'].message));
          observable.complete();
        }));
    });


  }

  getAllProgrammes(): Observable<any> {
    let result = this.http.get(GENERATE_TRANSCRIPT_API + 'programmes');
    return new Observable(observable => {
      observable.next(result.toPromise().then((result: any) => {
        observable.next(result);
        observable.complete();
      })
        .catch(error => {
          observable.next((error['error'].message));
          observable.complete();
        }));
    });
  }

  addNewTranscrpitType(name:string, type:string, programmeId:number=0): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    let queryParams = new HttpParams();
    console.log(name)
    console.log(type)
    console.log(programmeId)

    let bodyJson = {
      "name":name,
      "type":type,
      "programmeId":programmeId
    }
    let result = this.http.post(GENERATE_TRANSCRIPT_API + 'transcript_type/add_new_transcript_type',bodyJson ,{ headers: headers, responseType: 'text'});
    return new Observable(observable => {
      observable.next(result.toPromise().then((result: any) => {
        console.log("Result: ", result);
        if(result=="success"){
          observable.next(result);
          observable.next(result);
          observable.complete();
        }else{
          // alert(result);
          Swal.fire('Success...','Record Added Successfully', 'success').
          then((result) => {
            if(result){
              location.reload();
            }
          })
        }
      })
        .catch(error => {
          observable.next((error['error'].message));
          observable.complete();
        }));
    });


  }




  searchResponseToAPI() : Observable<any> {
    // console.log(form.value);
    let result = this.http.get(GENERATE_TRANSCRIPT_API + 'transcript_type/get_all_transcript_types', {
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

  getAllProgSpecificTransTypes(): Observable<any> {

    let result = this.http.get(GENERATE_TRANSCRIPT_API + 'transcript_type/get_all_prog_specific_trans_types');
    return new Observable(observable => {
      observable.next(result.toPromise().then((result: any) => {
        console.log("Programme Specific Transcript Types : ", result);
        observable.next(result);
        observable.complete();
      })
        .catch(error => {
          observable.next((error['error'].message));
          observable.complete();
        }));
    });


  }

  archiveTranscrpitType(id:number): Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id",id);
    let result = this.http.get(GENERATE_TRANSCRIPT_API + 'transcript_type/archive_transcript_type' ,{params:queryParams,responseType: 'text'});
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
          console.log(error);
          observable.next((error['error'].message));
          Swal.fire('Error...','error', 'error');
          observable.complete();
          //location.reload();
        }));
    });
  }




}
