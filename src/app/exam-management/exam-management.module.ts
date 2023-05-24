import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyTranscriptComponent } from './transcript/verify-transcript/verify-transcript.component';
import { PrintTranscriptComponent } from './transcript/print-transcript/print-transcript.component';
import { ViewTranscriptRequestDetailsComponent } from './transcript/verify-transcript/view-transcript-request-details/view-transcript-request-details.component';
import { VerifyAndGenerateResultSheetComponent } from './transcript/verify-transcript/verify-and-generate-result-sheet/verify-and-generate-result-sheet.component';
import { ViewPrintTranscriptDetailsComponent } from './transcript/print-transcript/view-print-transcript-details/view-print-transcript-details.component';
import { PrinterComponent } from './transcript/print-transcript/printer/printer.component';
import {DemoMaterialModule} from "../demo-material-module";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {DataTablesModule} from "angular-datatables";
import {ReactiveFormsModule} from "@angular/forms";
import { TranscriptTypeComponent } from './master-data/transcript-type/transcript-type.component';
import { ResultTypeComponent } from './master-data/result-type/result-type.component';
import { DayQuotaAllocationComponent } from './master-data/day-quota-allocation/day-quota-allocation.component';
import { TranscriptTypeAndResultTypeComponent } from './master-data/transcript-type-and-result-type/transcript-type-and-result-type.component';
@NgModule({
  declarations: [
    VerifyTranscriptComponent,
    PrintTranscriptComponent,
    ViewTranscriptRequestDetailsComponent,
    VerifyAndGenerateResultSheetComponent,
    ViewPrintTranscriptDetailsComponent,
    PrinterComponent,
    TranscriptTypeComponent,
    ResultTypeComponent,
    DayQuotaAllocationComponent,
    TranscriptTypeAndResultTypeComponent
  ],
  imports: [
    DemoMaterialModule,
    CommonModule,
    NgxMatSelectSearchModule,
    DataTablesModule,
    ReactiveFormsModule
  ]
})
export class ExamManagementModule { }
