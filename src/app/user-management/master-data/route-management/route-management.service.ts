import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

const USER_MANAGEMENT_API = environment.base_url_user_mgt;
const ROUTE_API = USER_MANAGEMENT_API + '/api/v1/routes';

@Injectable({
  providedIn: 'root'
})
export class RouteManagementService {

  constructor(private http: HttpClient) { }

  getAllRoutes(): Observable<any> {

    let result = this.http.get(ROUTE_API + '/get_all_routes');
    return new Observable(observable => {
      observable.next(result.toPromise().then((result: any) => {
        console.log("Routes : ", result);
        observable.next(result);
        observable.complete();
      })
        .catch(error => {
          observable.next((error['error']));
          observable.complete();
        }));
    });


  }
//
  getAllCategories(): Observable<any> {
    //http://localhost:8081/api/user_management/category/get_all_categories
    let result = this.http.get(USER_MANAGEMENT_API + '/api/user_management/category/get_all_categories');
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
//
//   addNewRoute(name:string,categoryId:number=0,active:string,): Observable<any> {
//     const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
//     let queryParams = new HttpParams();
//     console.log(name)
//     console.log(categoryId)
//     console.log(active)
//
//     let bodyJson = {
//       "name":name,
//       "categoryId":categoryId,
//       "active":active,
//     }
//     let result = this.http.post(GENERATE_TRANSCRIPT_API + 'route/add_new_route',bodyJson ,{ headers: headers, responseType: 'text'});
//     return new Observable(observable => {
//       observable.next(result.toPromise().then((result: any) => {
//         console.log("Result: ", result);
//         if(result=="success"){
//           observable.next(result);
//           observable.next(result);
//           observable.complete();
//         }else{
//           // alert(result);
//           Swal.fire('Success...','Record Added Successfully', 'success').
//           then((result) => {
//             if(result){
//               location.reload();
//             }
//           })
//         }
//       })
//         .catch(error => {
//           observable.next((error['error'].message));
//           observable.complete();
//         }));
//     });
//
//
//   }
//
//
//
//
//   searchResponseToAPI() : Observable<any> {
//     // console.log(form.value);
//     let result = this.http.get(GENERATE_TRANSCRIPT_API + 'transcript_type/get_all_transcript_types', {
//       responseType: 'json',
//     });
//
//     return new Observable((observable) => {
//       observable.next(
//         result
//           .toPromise()
//           .then((result: any) => {
//             observable.next(result);
//             observable.complete();
//             // observable.next('success:Your account has been created successfully. Please check the email to find the username and password.');
//
//           })
//           .catch((error) => {
//             console.log(error);
//             observable.next(error['error']);
//             observable.complete();
//           })
//       );
//     });
//   }
//
//   archiveRoute(id:number): Observable<any>{
//     let queryParams = new HttpParams();
//     queryParams = queryParams.append("id",id);
//     let result = this.http.get(GENERATE_TRANSCRIPT_API + 'transcript_type/archive_transcript_type' ,{params:queryParams,responseType: 'text'});
//     return new Observable(observable => {
//       observable.next(result.toPromise().then((result: any) => {
//         console.log("Result: ", result);
//
//         if(result.toLowerCase().trim().startsWith("success")){
//           // Swal.fire('Success...','Record Deleted Successfully', 'success');
//           observable.next(result);
//           observable.next(result);
//           observable.complete();
//           setTimeout(() =>{ location.reload();},3000);
//         }else{
//           Swal.fire('Error...','error', 'error');
//         }
//
//       })
//         .catch(error => {
//           console.log(error);
//           observable.next((error['error'].message));
//           Swal.fire('Error...','error', 'error');
//           observable.complete();
//           //location.reload();
//         }));
//     });
//   }
//
//
//
//
}
