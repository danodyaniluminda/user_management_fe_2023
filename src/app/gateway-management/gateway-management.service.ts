import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {observable, Observable} from "rxjs";
import * as http from "http";
import {GatewayRoutesModel} from "./gateway-routes/gateway-routes.model";

const GATEWAY_API= environment.gateway_url + '/api/gateway';

@Injectable({
  providedIn: 'root'
})
export class GatewayManagementService {

  private _gatewayRoutesModel:GatewayRoutesModel;
  set gatewayRoutesModel(value: GatewayRoutesModel) {
    this._gatewayRoutesModel = value;
  }

  constructor(private http:HttpClient, private router:Router) { }




  getAllGatewayRoutes():Observable<any> | null{
    let result = this.http.get(GATEWAY_API + '/gateway_routes/get_all_gateway_routes');
    return new Observable(
      observable => {
        result.toPromise()
          .then(
            (data:any) => {
              this._gatewayRoutesModel.allGatewayRoutes = data;
              observable.next(data);
              observable.complete();
            }
          )
          .catch(
            (error:any) => {
              console.log(error);
              observable.next(error);
              observable.complete();
            }
          )
      }
    );
  }





  /*

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

   */


}
