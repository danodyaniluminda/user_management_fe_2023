import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaymentReconcilationComponent} from "./transcript/payment-reconcilation/payment-reconcilation.component";


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
