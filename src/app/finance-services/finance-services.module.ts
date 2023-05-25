import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { FinanceServicesRoutingModule } from './finance-services-routing.module';
import {PaymentReconcilationComponent} from "./transcript/payment-reconcilation/payment-reconcilation.component";
import {DemoMaterialModule} from "../demo-material-module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    PaymentReconcilationComponent
  ],
  imports: [
    CommonModule,
    FinanceServicesRoutingModule,
    DemoMaterialModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
})
export class FinanceServicesModule { }
