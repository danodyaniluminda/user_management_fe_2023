import { Injectable } from '@angular/core';
import {Observable, of, tap} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {INavbarData} from "../../layouts/full/sidenav/helper";
import {environment} from "../../../environments/environment";

const GENERATE_TRANSCRIPT_API = environment.base_url_user_mgt + '/api/user_management/menu/';
@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private http :HttpClient) { }

  permission:[];
  getPermission(): Observable<any> {
    if (this.permission && this.permission.length>0){
      return of(this.permission)
    }
    return  this.http.get(GENERATE_TRANSCRIPT_API + 'get_permissions', {params: new HttpParams().append("role_name", 'admin')})
      .pipe(tap((result:any)=>{
        this.permission = result;
      }));
  }

}
