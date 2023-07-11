import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletionModuleComponent } from './generate-result/completion-module/completion-module.component';
import {CompletionModuleRoutingModule} from "./completion-module-routing.module";



@NgModule({
  declarations: [
    CompletionModuleComponent
  ],
  imports: [
    CommonModule,
    CompletionModuleRoutingModule
  ]
})
export class CompletionModuleModule { }
