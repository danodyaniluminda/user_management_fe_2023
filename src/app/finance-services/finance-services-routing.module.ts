import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaymentReconcilationComponent} from "./transcript/payment-reconcilation/payment-reconcilation.component";
import {
  ViewPrintTranscriptDetailsComponent
} from "../exam-management/transcript/print-transcript/view-print-transcript-details/view-print-transcript-details.component";
import {VerifyTranscriptComponent} from "../exam-management/transcript/verify-transcript/verify-transcript.component";
import {ExamGuardService} from "../shared/_services/ValidatePrivileges";

const routes: Routes = [

  {
    path:'transcript',
    // canActivate:[ExamGuardService],
    children:[
      {
        path : 'payment-reconciliation',
        component : PaymentReconcilationComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceServicesRoutingModule { }
