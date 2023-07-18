import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import {FormGroup} from "@angular/forms";

const GENERATE_STATUS_API = environment.base_url +'/api/generateResult';

@Injectable({
  providedIn: 'root'
})
export class AddNewCompletionService {

  constructor(private http: HttpClient) { }

  getAllProgrammes(): Observable<any> {

    let result = this.http.get(GENERATE_STATUS_API + '/getAllProgrammes');
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

}
