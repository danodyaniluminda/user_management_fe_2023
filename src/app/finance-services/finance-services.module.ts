import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentReconcilationComponent } from './transcript/payment-reconcilation/payment-reconcilation.component';
import { DemoMaterialModule } from '../demo-material-module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PaymentReconcilationComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule
  ]
})
export class FinanceServicesModule { }
