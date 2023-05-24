import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { ViewPrintTranscriptDetailsComponent } from "./exam-management/transcript/print-transcript/view-print-transcript-details/view-print-transcript-details.component";
import { VerifyTranscriptComponent } from "./exam-management/transcript/verify-transcript/verify-transcript.component";
import { PaymentReconcilationComponent } from './finance-services/transcript/payment-reconcilation/payment-reconcilation.component';
import {SidenavComponent} from "./layouts/full/sidenav/sidenav.component";
import {ResultTypeComponent} from "./exam-management/master-data/result-type/result-type.component";
import {TranscriptTypeComponent} from "./exam-management/master-data/transcript-type/transcript-type.component";

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path : 'view-print-transcript-details',
        component : ViewPrintTranscriptDetailsComponent
      },
      {
        path : 'verify_transcript',
        component : VerifyTranscriptComponent
      },
      {
        path : 'payment-reconcilation',
        component : PaymentReconcilationComponent
      },
      {
        path : 'add-result-type',
        component : ResultTypeComponent
      },
      {
        path : 'add-transcript-type',
        component : TranscriptTypeComponent
      }
    ]
  }
];
