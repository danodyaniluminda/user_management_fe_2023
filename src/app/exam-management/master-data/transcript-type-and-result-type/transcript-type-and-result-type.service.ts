import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// const TRANSCRIPT_ELIGIBILIYT_API = environment.base_url +'/api/v1/transcript_eligibility/';
const GENERATE_TRANSCRIPT_API = environment.base_url + '/api/v1/transcript_admin/';

@Injectable({
  providedIn: 'root'
})
export class TranscriptTypeAndResultTypeService {

  constructor(private http: HttpClient) { }

  dtTrigger: Subject<any> = new Subject<any>();

  getTranscriptEligibility(): Observable<any> {
    //http://localhost:8080/api/v1/transcript_admin/transcript_eligibility/get_all_transcript_eligibility
    let result = this.http.get(GENERATE_TRANSCRIPT_API + 'transcript_eligibility/get_all_transcript_eligibility');
    return new Observable(observable => {
      observable.next(result.toPromise().then((result: any) => {
        console.log("Transcript Eligibility -", result);
        observable.next(result);
        observable.complete();
      })
        .catch(error => {
          observable.next((error['error'].message));
          observable.complete();
        }));
    });
  }

  getTranscriptType(): Observable<any> {

    let result = this.http.get(GENERATE_TRANSCRIPT_API + 'transcript_type/get_all_transcript_types');
    return new Observable(observable => {
      observable.next(result.toPromise().then((result: any) => {

        console.log("Transcript Types -", result);
        // let filtered = result.filter((r: { status: boolean; }) => r.status==false);
        // console.log("Programme filtered -",filtered);
        observable.next(result);
        observable.complete();
      })
        .catch(error => {
          observable.next((error['error'].message));
          observable.complete();
        }));
    });
  }

  getResultType(): Observable<any> {
    let result = this.http.get(GENERATE_TRANSCRIPT_API + 'result_type/get_all_result_types');
    return new Observable(observable => {
      observable.next(result.toPromise().then((result: any) => {

        console.log("Result Types -", result);
        observable.next(result);
        observable.complete();
      })
        .catch(error => {
          observable.next((error['error'].message));
          observable.complete();
        }));
    });
  }


  saveTranscriptEligibility(transcript_type_id: any, transcript_result_type_id: any): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("transcript_type_id", transcript_type_id);
    queryParams = queryParams.append("transcript_result_type_id", transcript_result_type_id);
    let result = this.http.post(
      GENERATE_TRANSCRIPT_API + 'transcript_eligibility/add_new_transcript_eligibility',null, { params:queryParams });
    return new Observable(
      observable => {
        observable.next(
          result.toPromise()
            .then((result: any) => {
              observable.next(result);
              observable.complete();
            })
            .catch(
              (error: any) => {
                console.log(error);
                observable.complete();
              }
            )
        );
      }
    );

  }
}






