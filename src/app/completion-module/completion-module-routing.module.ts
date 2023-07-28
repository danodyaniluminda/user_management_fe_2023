import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CompletionModuleComponent} from "./generate-result/completion-module/completion-module.component";
import { TableManagementComponent } from './table-management/table-management.component';
import {StudentManagementComponent} from "./generate-result/student-management/student-management.component";


const routes: Routes = [

  {
    path:'generate-result',
    // canActivate:[ExamGuardService],
    children:[
      {
        path : 'completion-module',
        component : CompletionModuleComponent
      },
      {
        path : 'student-management',
        component : StudentManagementComponent
      },
    ]
  },

  {
    path:'table-management',
    component: TableManagementComponent

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompletionModuleRoutingModule { }
