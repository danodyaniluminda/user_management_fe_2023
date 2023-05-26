import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  ViewPrintTranscriptDetailsComponent
} from "./transcript/print-transcript/view-print-transcript-details/view-print-transcript-details.component";
import {VerifyTranscriptComponent} from "./transcript/verify-transcript/verify-transcript.component";
import {DayQuotaAllocationComponent} from "./master-data/day-quota-allocation/day-quota-allocation.component";
import {ResultTypeComponent} from "./master-data/result-type/result-type.component";
import {TranscriptTypeComponent} from "./master-data/transcript-type/transcript-type.component";
import {
  TranscriptTypeAndResultTypeComponent
} from "./master-data/transcript-type-and-result-type/transcript-type-and-result-type.component";

const routes: Routes = [
  {
    path:'transcript',
    children:[
      {
        path: 'print-transcript',
        component: ViewPrintTranscriptDetailsComponent
      },
      {
        path: 'verify-transcript',
        component: VerifyTranscriptComponent
      },
    ]
  },
  {
    path:'master-data',
    children:[
      {
        path:'day-quota-allocation',
        component:DayQuotaAllocationComponent
      },
      {
        path:'result-type',
        component:ResultTypeComponent
      },
      {
        path:'transcript-type',
        component:TranscriptTypeComponent
      },
      {
        path:'transcript-type-and-result-type',
        component:TranscriptTypeAndResultTypeComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamManagementRoutingModule {
}
