import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletionModuleComponent } from './generate-result/completion-module/completion-module.component';
import {CompletionModuleRoutingModule} from "./completion-module-routing.module";
import {DataTablesModule} from "angular-datatables";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";



@NgModule({
  declarations: [
    CompletionModuleComponent
  ],
  imports: [
    CommonModule,
    CompletionModuleRoutingModule,
    DataTablesModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    NgxMatSelectSearchModule
  ]
})
export class CompletionModuleModule { }
