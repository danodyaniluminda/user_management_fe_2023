import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

const GENERATE_TRANSCRIPT_API = environment.base_url + '/api/v1/transcript_admin/';

@Injectable({
  providedIn: 'root'
})
export class DayQuotaAllocationService {
  toPromise() {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) { }

  dtTrigger: Subject<any> = new Subject<any>();

  getDayQuotaAllocation(): Observable<any> {
    let result = this.http.get(GENERATE_TRANSCRIPT_API + 'transcript_one_day_quota/get_all_transcript_one_day_quota');
    return new Observable(observable => {
      observable.next(result.toPromise().then((result: any) => {
        console.log("Day Quota Allocation -", result);
        observable.next(result);
        observable.complete();
      })
        .catch(error => {
          observable.next((error['error'].message));
          observable.complete();
        }));
    });
  }


// for getting programmes from programme table

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

//get search response from table

  searchResponseToAPI() : Observable<any> {
    console.log();
    let result = this.http.get(GENERATE_TRANSCRIPT_API + 'transcript_normal_quota/get_all_transcript_normal_quota');
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


getNormalQuotaAllocations():Observable<any>{
  let result = this.http.get(GENERATE_TRANSCRIPT_API+'transcript_normal_quota/get_all_transcript_normal_quota');
  return new Observable(observable => {
      observable.next(result.toPromise().then((result:any) => {

        console.log("Normal Quota  -",result);
        observable.next(result);
          observable.complete();
      })
      .catch(error => {
          observable.next((error['error'].message));
          observable.complete();
      }));
  });
}

}

