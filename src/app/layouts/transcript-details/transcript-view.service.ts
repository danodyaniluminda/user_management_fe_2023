import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const GENERATE_TRANSCRIPT_API = environment.base_url + '/api/v1/transcript_admin/';
/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class TranscriptViewService {

  constructor(private http: HttpClient, private router: Router) { }

  getTranscriptDetails(id:any): Observable<any> {
    const url = GENERATE_TRANSCRIPT_API + 'transcripts/get_transcript_details_by_id';
    let queryParams = new HttpParams();
    queryParams= queryParams.append("id",id);
    let result = this.http.get(url,{params:queryParams} );

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

}
