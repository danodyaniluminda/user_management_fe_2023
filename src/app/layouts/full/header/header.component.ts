import { Component } from '@angular/core';
import {User} from "../../../shared/_models/user";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../shared/_services";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {

  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  logout() {
    this.router.navigate(['/login']);
    this.authenticationService.logout();
    // this.router.navigateByUrl();
  }
}
