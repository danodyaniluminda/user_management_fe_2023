import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullComponent} from "./layouts/full/full.component";
import {
  ViewPrintTranscriptDetailsComponent
} from "./exam-management/transcript/print-transcript/view-print-transcript-details/view-print-transcript-details.component";
import {VerifyTranscriptComponent} from "./exam-management/transcript/verify-transcript/verify-transcript.component";
import {
  PaymentReconcilationComponent
} from "./finance-services/transcript/payment-reconcilation/payment-reconcilation.component";

const routes: Routes = [
  // {
  //   path: 'customers',
  //   loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
  // },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path:'exam',
        loadChildren:()=> import('./exam-management/exam-management.module').then(m => m.ExamManagementModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      { path: 'finance-services', loadChildren: () => import('./finance-services/finance-services.module').then(m => m.FinanceServicesModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}