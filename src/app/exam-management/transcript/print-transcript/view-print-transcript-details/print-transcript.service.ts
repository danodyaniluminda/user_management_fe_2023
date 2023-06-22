import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

const GENERATE_TRANSCRIPT_API = environment.base_url + '/api/v1/transcript_admin/';
const REQUEST_TRANSCRIPT_API_OLD_OMIS = environment.base_url_old_omis+'/api/old_omis_db/';
@Injectable({
  providedIn: 'root'
})
export class PrintTranscriptService {

  constructor(private http: HttpClient, private router: Router) { }


  getAllProgrammes(): Observable<any> {
    let result = this.http.get(GENERATE_TRANSCRIPT_API + 'programme/get_all_programmes');
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


  getAllTranscriptTypes(): Observable<any> {
    let result = this.http.get(GENERATE_TRANSCRIPT_API + 'transcript_type/get_all_transcript_types');
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

  getAllServiceTypes(): Observable<any> {
    let result = this.http.get(GENERATE_TRANSCRIPT_API + 'service_type/get_all_service_types');
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

  //transcripts/find_transcript
  searchResponseToAPI(form: FormGroup) : Observable<any> {
    console.log("form value",form.value);
    let result = this.http.post(GENERATE_TRANSCRIPT_API + 'transcripts/find_print_transcript', form.value, {
      responseType: 'json',
    });

    return new Observable((observable) => {
      observable.next(
        result
          .toPromise()
          .then((result: any) => {
            observable.next(result);
            console.log("form value get backend",result);
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

  getTranscriptDetails(applicantRegistrationNumber:any,isEngineering:boolean): Observable<any>{
    const url = REQUEST_TRANSCRIPT_API_OLD_OMIS+'get_certificate_details_by_applicant_registration_number_and_is_engineering';
    let queryParams = new HttpParams();
    queryParams= queryParams.append("applicant_registration_number",applicantRegistrationNumber);
    queryParams= queryParams.append("is_engineering",isEngineering);
    let result = this.http.get(url,{params:queryParams});
    console.log("gggggggg",url,queryParams);
    return new Observable(observable => {
      observable.next(result.toPromise().then((result:any) => {
        console.log("Transcript details -",result);
        observable.next(result);
        observable.complete();
      })
        .catch(error => {
     //     console.log("Programme selected details error message-",error['error'].message);
          observable.next((error['error'].message) );
          observable.complete();
        }));
    });
  }

  getgpaTable(id:any): Observable<any> {
    const url = GENERATE_TRANSCRIPT_API + 'transcripts/get_gpa_table_details';
    let queryParams = new HttpParams();
    queryParams= queryParams.append("id",id);
    let result = this.http.get(url,{params:queryParams} );

    //let result = this.http.get(GENERATE_TRANSCRIPT_API + 'service_type/get_all_service_types');
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

  saveTranscriptData(data:any){
    let result = this.http.post(GENERATE_TRANSCRIPT_API + 'transcripts/save_transcript_details', data, {
      responseType: 'text',
    });

    return new Observable((observable) => {
      observable.next(
        result
          .toPromise()
          .then((result: any) => {
            observable.next(result);
            console.log("save response is ",result);
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

//   getTranscriptFunctionForPrint(programmeId:any,transcriptTypeId:any): Observable<string> {
//     return new Observable<string>((observable) => {
//       let queryParams = new HttpParams();
//       queryParams= queryParams.append("programmeId",programmeId);
//       queryParams= queryParams.append("transcriptTypeId",transcriptTypeId);
//       this.http.get<string>(GENERATE_TRANSCRIPT_API + 'transcripts/getTranscriptFunctionForPrint', {params:queryParams}).toPromise()
//         .then((result: any) => {
//           observable.next(result);
//           console.log("Function name from service is ", result);
//           observable.complete();
//         })
//         .catch((error) => {
//           console.log(error);
//           observable.next(error['error']);
//           observable.complete();
//         });
//     });
// }

getTranscriptFunctionForPrint(programmeId:any,transcriptTypeId:any): Observable<any>{
  const url = GENERATE_TRANSCRIPT_API + 'transcripts/getTranscriptFunctionForPrint';
  let queryParams = new HttpParams();
  queryParams= queryParams.append("programmeId",programmeId);
  queryParams= queryParams.append("transcriptTypeId",transcriptTypeId);
  let result = this.http.get(url,{params:queryParams,responseType: "text"} );
  return new Observable(observable => {
    observable.next(
      result
      .toPromise()
      .then((result:any) => {
      console.log("Transcript details -",result);
      observable.next(result);
      observable.complete();
    })
      .catch(error => {
        alert("error work");
        console.log("Programme selected details error message-",error['error']);
        observable.next((error['error'].message) );
        observable.complete();
      }));
  });
}

saveGPATable(code:any): Observable<any>{
  const url = GENERATE_TRANSCRIPT_API + 'transcripts/save_gpaTable';
  let queryParams = new HttpParams();
  console.log("cvvcvc",code);
  queryParams= queryParams.append("code",decodeURIComponent(code));
  let result = this.http.post(url,null,{params:queryParams,responseType: "text"} );
  return new Observable(observable => {
    observable.next(
      result
      .toPromise()
      .then((result:any) => {
      console.log("save gpaTable details -",result);
      observable.next(result);
      observable.complete();
    })
      .catch(error => {
        alert("error work");
        console.log("Programme selected gfgf details error message-",error['error']);
        observable.next((error['error'].message) );
        observable.complete();
      }));
  });
}
}
