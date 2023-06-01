import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import {RoleManagementComponent} from "./master-data/role-management/role-management.component";
import {UserRoleManagementComponent} from "./master-data/user-role-management/user-role-management.component";
import {RouteManagementComponent} from "./master-data/route-management/route-management.component";
import {RouteRoleManagementComponent} from "./master-data/route-role-management/route-role-management.component";


@NgModule({
  declarations: [
    RoleManagementComponent,
    UserRoleManagementComponent,
    RouteManagementComponent,
    RouteRoleManagementComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule
  ]
})
export class UserManagementModule { }
