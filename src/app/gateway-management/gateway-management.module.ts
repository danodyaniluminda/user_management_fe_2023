import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GatewayManagementRoutingModule } from './gateway-management-routing.module';
import { GatewayRoutesComponent } from './gateway-routes/gateway-routes.component';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {DataTablesModule} from "angular-datatables";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import { NgxDatatableModule } from '@tusharghoshbd/ngx-datatable';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    GatewayRoutesComponent
  ],
  imports: [
    CommonModule,
    GatewayManagementRoutingModule,
    MatCardModule,
    MatInputModule,
    DataTablesModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatIconModule
  ]
})
export class GatewayManagementModule { }
