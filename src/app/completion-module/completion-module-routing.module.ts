import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CompletionModuleComponent} from "./generate-result/completion-module/completion-module.component";

const routes: Routes = [

  {
    path:'generate-result',
    // canActivate:[ExamGuardService],
    children:[
      {
        path : 'completion-module',
        component : CompletionModuleComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompletionModuleRoutingModule { }
