import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../_models/user";
import {PermissionService} from "../services/permission.service";



@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient,private permissionService:PermissionService) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(<string>localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    // post to fake back end, this url will be handled there...

    return this.http
      .post<any>(`/users/authenticate`, { username, password })
      .pipe(
        map(user => {
          user.authdata = window.btoa(username + ":" + password);
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }


  logout() {
    // remove user from local storage to log user out
    this.permissionService.setPermission();
    localStorage.removeItem("currentUser");
    // @ts-ignore
    this.currentUserSubject.next(null);
  }
}
