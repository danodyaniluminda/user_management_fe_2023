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
import {NotFoundComponent} from "./layouts/error/not-found/not-found.component";
import {TranscriptViewComponent} from './layouts/transcript-details/transcript-view.component';
import {DashboardAccess, PermissionGuardService} from "./shared/services/ValidatePrivileges";
import {AccessDeniedComponent} from "./layouts/error/access-denied/access-denied.component";

const routes: Routes = [
  {
    path: 'transcript-view',
    component: TranscriptViewComponent
  },
  {
    path: '',
    component: FullComponent,
    canActivateChild: [PermissionGuardService],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'exam',
        loadChildren: () => import('./exam-management/exam-management.module').then(m => m.ExamManagementModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'finance-services',
        loadChildren: () => import('./finance-services/finance-services.module').then(m => m.FinanceServicesModule)
      },
      {
        path: 'user-management',
        loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule)
      },
      {
        path: 'access-denied',
        component:AccessDeniedComponent

      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
