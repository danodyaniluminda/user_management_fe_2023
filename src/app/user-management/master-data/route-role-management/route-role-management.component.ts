import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'user-route-role-management',
  templateUrl: './route-role-management.component.html',
  styleUrls: ['./route-role-management.component.css']
})
export class RouteRoleManagementComponent implements OnInit {

  // form = new FormGroup({
  //   fromDate: new FormControl(),
  //   toDate: new FormControl(),
  //   roleName: new FormControl(),
  //   routeName: new FormControl(),
  // });

  constructor() { }

  ngOnInit(): void {
  }

}
