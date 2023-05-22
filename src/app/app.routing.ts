import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import {
  ViewPrintTranscriptDetailsComponent
} from "./exam-management/transcript/print-transcript/view-print-transcript-details/view-print-transcript-details.component";
import {VerifyTranscriptComponent} from "./exam-management/transcript/verify-transcript/verify-transcript.component";

export const AppRoutes: Routes = [
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
        path : 'transcript-type-and-results-status',
        component : ViewPrintTranscriptDetailsComponent
      },
      {
        path : 'verify_transcript',
        component : VerifyTranscriptComponent
      },
    ]
  }
];
