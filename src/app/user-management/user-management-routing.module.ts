import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  DayQuotaAllocationComponent
} from "../exam-management/master-data/day-quota-allocation/day-quota-allocation.component";
import {ResultTypeComponent} from "../exam-management/master-data/result-type/result-type.component";
import {TranscriptTypeComponent} from "../exam-management/master-data/transcript-type/transcript-type.component";
import {
  TranscriptTypeAndResultTypeComponent
} from "../exam-management/master-data/transcript-type-and-result-type/transcript-type-and-result-type.component";
import {RoleManagementComponent} from "./master-data/role-management/role-management.component";
import {RouteManagementComponent} from "./master-data/route-management/route-management.component";
import {UserRoleManagementComponent} from "./master-data/user-role-management/user-role-management.component";
import {RouteRoleManagementComponent} from "./master-data/route-role-management/route-role-management.component";

const routes: Routes = [
  {
    path:'master-data',
    children:[
      {
        path:'role-management',
        component:RoleManagementComponent,
      },
      {
        path:'route-management',
        component:RouteManagementComponent,
      },
      {
        path:'user-role-management',
        component:UserRoleManagementComponent,
      },
      {
        path:'role-route-management',
        component:RouteRoleManagementComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
