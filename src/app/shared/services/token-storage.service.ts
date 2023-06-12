import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const ALL_ROLES_KEY = 'all-roles';
const APPLICANT = 'applicant';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {


  constructor(private router: Router) { }

  signOut() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.removeItem(ALL_ROLES_KEY);
    window.localStorage.clear();
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem(ALL_ROLES_KEY);
    window.sessionStorage.clear();
    this.router.navigate(["/user-management/user-signin"]).then(() => {
      window.location.reload();
    });

  }



  public saveLoginResponse(userResponse: any, selectedRole: any) {
    let a = '';
    console.log("User Response is : ", userResponse);

    let user = {
      userId: userResponse.username,
      role: selectedRole,
      roles: userResponse.roles,
      menu: userResponse.menu[selectedRole.role_id],
      allMenu: userResponse.menu
    }
    console.log("user", user);
    // alert(userResponse)

    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));

    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, userResponse.token);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, userResponse.token);
    window.sessionStorage.removeItem(ALL_ROLES_KEY);

    window.sessionStorage.setItem(ALL_ROLES_KEY, JSON.stringify(userResponse.roles));
    window.localStorage.removeItem(ALL_ROLES_KEY);
    window.localStorage.setItem(ALL_ROLES_KEY, JSON.stringify(userResponse.roles));

  }


  public getUser() {
    if (sessionStorage.getItem(USER_KEY) != null) {
      return JSON.parse(sessionStorage.getItem(USER_KEY) || "");
    } else if (localStorage.getItem(USER_KEY) != null) {
      return JSON.parse(localStorage.getItem(USER_KEY) || "");
    }
  }
  public getToken() {
    if (sessionStorage.getItem(TOKEN_KEY) != null) {
      return sessionStorage.getItem(TOKEN_KEY) || "";
    } else if (localStorage.getItem(TOKEN_KEY) != null) {
      return localStorage.getItem(TOKEN_KEY) || "";
    }
    else return "";
  }
  public changeRole(role: any) {
    let user = this.getUser();
    user.role = role;
    user.menu = user.allMenu[role.role_id],
      window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    window.location.reload();
  }

  public getAllRoles() {
    if (sessionStorage.getItem(ALL_ROLES_KEY) != null) {
      let allRoles = [];
      const allRolesJson = JSON.parse(sessionStorage.getItem(ALL_ROLES_KEY) || "")
      for (let index = 0; index < allRolesJson.length; index++) {
        allRoles.push(allRolesJson[index]);

      }
      return allRoles;
    } else if (localStorage.getItem(USER_KEY) != null) {
      let allRoles = [];
      const allRolesJson = JSON.parse(localStorage.getItem(ALL_ROLES_KEY) || "")
      for (let index = 0; index < allRolesJson.length; index++) {
        allRoles.push(allRolesJson[index]);
      }
      return allRoles;
    }
    return [];
  }

  isUserSignedIn() {
    if (this.getUser()) {
      return true;
    } else {
      return false;
    }
  }

  public saveApplicant(applicant:any){
    window.sessionStorage.removeItem(APPLICANT);
    window.localStorage.removeItem(APPLICANT);
    window.sessionStorage.setItem(APPLICANT, JSON.stringify(applicant));
    window.localStorage.setItem(APPLICANT, JSON.stringify(applicant));
  }

}