import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {INavbarData} from "../../layouts/full/sidenav/helper";
import {environment} from "../../../environments/environment";

const GENERATE_TRANSCRIPT_API = environment.base_url_user_mgt + '/api/user_management/menu/';
@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  get permission(): any {
    return this._permission;
  }

  set permission(value: any) {
    this._permission = value;
  }

  constructor(private http :HttpClient) { }

  private _permission:any;
  getPermission(): Observable<any> {
    let result = this.http.get<INavbarData[]>(GENERATE_TRANSCRIPT_API + 'get_permissions', {params: new HttpParams().append("role_name", 'admin')});
    return new Observable(observable => {
      observable.next(result.toPromise().then((result: any) => {
        this.permission = result;
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
