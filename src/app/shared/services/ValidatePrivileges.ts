import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
  CanActivateChild
} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable, OnInit} from '@angular/core';
import {PermissionService} from "./permission.service";


// CanActivate route gurd decodes if a route can be activated or not.
// this route gurd can br used in cases whre the user is not authorized to navigate to te target route.
// this can be activated using given condition
@Injectable({
  providedIn: 'root'
})

export class PermissionGuardService implements CanActivateChild {

  constructor(private router: Router, private permissionService: PermissionService) {
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.getPermission(state);
  }
  private async getPermission(state: RouterStateSnapshot): Promise<boolean> {
    return await this.permissionService
      .getPermission()
      .toPromise()
      .then((res: any) => {
        return this.validate(res, state);
      }).catch((error: any) => {
        console.error(error);
        return false;
      });
  }
  // private getPermission(state: RouterStateSnapshot) {
  //   let subscription = this.permissionService
  //     .getPermission()
  //     .subscribe((data: any) => {
  //       return this.validate(data, state);
  //     }, (err: Error) => {
  //     });
  //   console.log(subscription)
  //   return true
  // }


  private validate(res: any, state: RouterStateSnapshot) {
    for (let permission of res) {
      if (state.url.toLowerCase() == permission.routeLink.toLowerCase()) {
        return true;
      }
    }
    this.router.navigate(['/access-denied']);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})

export class DashboardAccess implements CanActivate {
  canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
