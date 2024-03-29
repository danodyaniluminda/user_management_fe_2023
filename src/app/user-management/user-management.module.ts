import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import {RoleManagementComponent} from "./master-data/role-management/role-management.component";
import {UserRoleManagementComponent} from "./master-data/user-role-management/user-role-management.component";
import {RouteManagementComponent} from "./master-data/route-management/route-management.component";
import {RouteRoleManagementComponent} from "./master-data/route-role-management/route-role-management.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {MatSortModule} from "@angular/material/sort";
import {MatTableExporterModule} from "mat-table-exporter";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {DataTablesModule} from "angular-datatables";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgxDatatableModule} from "@tusharghoshbd/ngx-datatable";
import { AddNewRoleComponent } from './master-data/role-management/add-new-role/add-new-role.component';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    RoleManagementComponent,
    UserRoleManagementComponent,
    RouteManagementComponent,
    RouteRoleManagementComponent,
    AddNewRoleComponent
  ],
    imports: [
        CommonModule,
        UserManagementRoutingModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSortModule,
        MatTableExporterModule,
        MatTableModule,
        MatTooltipModule,
        MatCheckboxModule,
        NgxMatSelectSearchModule,
        MatDatepickerModule,
        MatGridListModule,
        ReactiveFormsModule,
        NgxMatSelectSearchModule,
        DataTablesModule,
        NgxDatatableModule
    ]
  // imports: [
  //   CommonModule,
  //   UserManagementRoutingModule,
  //   FormsModule,
  //   MatButtonModule,
  //   MatCardModule,
  //   MatFormFieldModule,
  //   MatIconModule,
  //   MatInputModule,
  //   MatOptionModule,
  //   MatPaginatorModule,
  //   MatSelectModule,
  //   MatSortModule,
  //   MatTableExporterModule,
  //   MatTableModule,
  //   MatTooltipModule,
  //   NgxMatSelectSearchModule,
  //   NgxDatatableModule
  // ]
})
export class UserManagementModule { }
