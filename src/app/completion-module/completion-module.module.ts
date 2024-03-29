import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletionModuleComponent } from './generate-result/completion-module/completion-module.component';
import {CompletionModuleRoutingModule} from "./completion-module-routing.module";
import { TableManagementComponent } from './table-management/table-management.component';
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
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { StudentManagementComponent } from './generate-result/student-management/student-management.component';
import {MatTabsModule} from '@angular/material/tabs'




@NgModule({
  declarations: [
    CompletionModuleComponent,
    TableManagementComponent,
    StudentManagementComponent,
  ],
  imports: [
    CommonModule,
    CompletionModuleRoutingModule,
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
        NgxMatSelectSearchModule,
        MatDatepickerModule,
        MatGridListModule,
        ReactiveFormsModule,
        NgxMatSelectSearchModule,
        DataTablesModule,
        NgxDatatableModule,
        FormsModule,
        MatTabsModule

  ]
})
export class CompletionModuleModule { }
