import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VerifyAndGenerateResultSheetModel } from './verify-and-generate-result-sheet.model';
import { MatTableDataSource } from '@angular/material/table';

const TRANSCRIPT_ADMIN_API = environment.base_url + '/api/v1/transcript_admin';
const OLD_OMIS_API = environment.base_url_old_omis+'/api/old_omis_db';



@Injectable({
  providedIn: 'root'
})
export class VerifyAndGenerateResultSheetService {

  private _verifyAndGenerateResultSheetModel: VerifyAndGenerateResultSheetModel;

  public get verifyAndGenerateResultSheetModel(): VerifyAndGenerateResultSheetModel {
    return this._verifyAndGenerateResultSheetModel;
  }
  public set verifyAndGenerateResultSheetModel(value: VerifyAndGenerateResultSheetModel) {
    this._verifyAndGenerateResultSheetModel = value;
  }

  constructor(private http:HttpClient, private router:Router) { }




  getCertificateDetailsByApplicantRegistrationNumberAndIsEngineering(registrationNumber:number):Observable<any>{

    let queryParams = new HttpParams();
    queryParams = queryParams.append("applicant_registration_number", registrationNumber).append("is_engineering", false);
    
    let result = this.http.get(
      OLD_OMIS_API + '/get_certificate_details_by_applicant_registration_number_and_is_engineering',
      {params : queryParams });
    return new Observable(
      observable => {
        observable.next(
          result.toPromise()
          .then((result:any) => {
            this._verifyAndGenerateResultSheetModel.personalDetails = result.personalDetails;
            this._verifyAndGenerateResultSheetModel.academicPerformanceDetails = result.academicPerformanceDetails;
            observable.next(result);
            observable.complete();
          })
          .catch(
            (error:any) => {
              console.log(error);
              observable.complete();
            }
          )

        );
      }
    );

  }

  changeTranscriptStatusByTranscriptIdAndServedStatus(transcriptId:number, transcriptResultStatusTypeId:number):Observable<any>{

    let queryParams = new HttpParams();
    queryParams = queryParams.append("transcriptId", transcriptId).append("transcriptResultStatusTypeId", transcriptResultStatusTypeId);
    let result = this.http.post(
      TRANSCRIPT_ADMIN_API + '/transcripts/change_transcript_status_by_transcript_id_and_served_status',
      null,
      {params : queryParams });
    return new Observable(
      observable => {
        observable.next(
          result.toPromise()
          .then((result:any) => {
            console.log(result);
            observable.next(result);
            observable.complete();
          })
          .catch(
            (error:any) => {
              console.log(error);
              observable.complete();
            }
          )

        );
      }
    );

  }

  getTranscriptById(transcriptId:number){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("transcriptId", transcriptId);
    let result = this.http.get(
      TRANSCRIPT_ADMIN_API + '/transcripts/get_transcript_by_id',
      {params : queryParams });
      return new Observable(
        observable => {
          observable.next(
            result.toPromise()
            .then((result:any) => {
              console.log(result);
              this._verifyAndGenerateResultSheetModel.transcript = result;
              observable.next(result);
              observable.complete();
            })
            .catch(
              (error:any) => {
                console.log(error);
                observable.complete();
              }
            )
  
          );
        }
      );
  }

}