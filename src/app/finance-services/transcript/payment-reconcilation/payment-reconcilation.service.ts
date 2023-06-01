import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

const GENERATE_TRANSCRIPT_API = environment.base_url +'/api/v1/transcript_admin/';

@Injectable({
  providedIn: 'root'
})
export class PaymentReconcilationService {

  constructor(private http: HttpClient,private router: Router) { }

  dtTrigger: Subject<any> = new Subject<any>();

  getVoucherDetails():Observable<any>{
    let result = this.http.get(GENERATE_TRANSCRIPT_API+'voucher/get_all_vouchers');
    return new Observable(observable => {
        observable.next(result.toPromise().then((result:any) => {

          console.log("Voucher details -",result);
          observable.next(result);
            observable.complete();
        })
        .catch(error => {
            observable.next((error['error'].message));
            observable.complete();
        }));
    });
}

updateVoucherByAdmin(selectedvoucher:any):Observable<any>{
  let result = this.http.put(GENERATE_TRANSCRIPT_API+'voucher/update_voucher',
  selectedvoucher,{responseType: 'text'});
//  console.log("sending data",result);
  return new Observable(observable => {
      observable.next(result.toPromise().then((result:any) => {
        console.log("Result",result);

          if(result=="success"){
            observable.next(result);
            observable.next(result);
            observable.complete();
          }else{
            // alert(result);
            Swal.fire('Success!','Record Updated Successfully.', 'success').
            then((result) => {
              if(result){
                // window.location.reload();
                location.reload();
              }
            })
          }


      })
      .catch(error => {
        observable.next(error);
          observable.complete();
      }));
  });
}


}
