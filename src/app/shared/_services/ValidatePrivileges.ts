
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
  CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SignedIn implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const user = this.tokenStorageService.getUser();
    if(user){
      return true;
    }else{
      this.router.navigate(['/user-management/user-signin']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class NotSignedIn implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const user = this.tokenStorageService.getUser();
    if(!user){
      return true;
    }else{
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProgramCoordinator implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const user = this.tokenStorageService.getUser();
    // console.log(user.roles);
    if(user.userId!=null && user.userId!='' ){
      if(user.role.role_id == 'PROGRAMME_COORDINATOR' ){
        return true;
      }else{
        this.router.navigate(['/dashboard']);
        return false;
      }
    }else{
      this.router.navigate(['/user-management/user-signin']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class CourseCoordinator implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const user = this.tokenStorageService.getUser();
    // console.log(user.roles);
    if(user.userId!=null && user.userId!='' ){
      if(user.role.role_id == 'COURSE_COORDINATOR' ){
        return true;
      }else{
        this.router.navigate(['/dashboard']);
        return false;
      }
    }else{
      this.router.navigate(['/user-management/user-signin']);
      return false;
    }
  }
}



@Injectable({
  providedIn: 'root'
})
export class SystemAdministrator implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const user = this.tokenStorageService.getUser();
    console.log(user.roles);
    console.log(user);
    console.log("ROLEID = ",user.role)
    if(user.userId!=null && user.userId!='' ){
      if(user.role.role_id == 'SYSTEM_ADMINISTRATOR' ){
        console.log("True");
        return true;
      }else{
        this.router.navigate(['/dashboard']);
        console.log("False");
        return false;
      }
    }else{
      this.router.navigate(['/user-management/user-signin']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class Applicant implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const user = this.tokenStorageService.getUser();
    // console.log(user.roles);
    if(user.userId!=null && user.userId!='' ){
      if(user.role.role_id == 'APPLICANT' ){
        return true;
      }else{
        this.router.navigate(['/online-application/apply-programme']);
        return false;
      }
    }else{
      this.router.navigate(['/user-management/user-signin']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class User implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const user = this.tokenStorageService.getUser();
    console.log(user.roles);
    if(user.userId!=null && user.userId!='' ){
      console.log(user.role.role_id);
      if(user.role.role_id == 'USER' ){
        return true;
      }else{
          this.router.navigate(['/dashboard']);
        return false;
      }
    }else{
      this.router.navigate(['/user-management/user-signin']);
      return false;
    }
  }
}

// CanActivate route gurd decodes if a route can be activated or not.
// this route gurd can br used in cases whre the user is not authorized to navigate to te target route.
// this can be activated using given condition
export class ExamGuardService implements CanActivate,CanActivateChild{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return false;
  }

}
