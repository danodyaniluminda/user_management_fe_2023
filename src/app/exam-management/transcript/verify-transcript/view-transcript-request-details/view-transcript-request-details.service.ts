import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {environment} from "../../../../../environments/environment";

const GENERATE_TRANSCRIPT_API = environment.base_url + '/api/v1/transcript_admin/';

@Injectable({
  providedIn: 'root'
})

export class ViewTranscriptRequestDetailsService {
  get programmes(): any {
    return this._programmes;
  }

  set programmes(value: any) {
    this._programmes = value;
  }

  constructor(private http: HttpClient, private router: Router) {
  }
  private _programmes : any;

  getAllProgrammes(): Observable<any> {
    let result = this.http.get(GENERATE_TRANSCRIPT_API + 'programme/get_all_programmes');
    return new Observable(observable => {
      observable.next(result.toPromise().then((result: any) => {
        this._programmes = result;
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
  getAllStatusesTypes(): Observable<any> {
    let result = this.http.get(GENERATE_TRANSCRIPT_API + 'status/get_all_status');
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

  searchResponseToAPI(form: FormGroup) : Observable<any> {
    console.log(form.value);
    let result = this.http.post(GENERATE_TRANSCRIPT_API + 'transcripts/find_transcript',form.value, {
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
}
