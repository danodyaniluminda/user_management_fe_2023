
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import {DataTablesModule} from "angular-datatables";
import {QRCodeModule} from "angularx-qrcode";
import {NgxQRCodeModule} from "@techiediaries/ngx-qrcode";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import { ExamManagementModule } from './exam-management/exam-management.module';
import { FinanceServicesModule } from './finance-services/finance-services.module';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    CommonModule,
    RouterModule.forRoot(AppRoutes),
    ReactiveFormsModule,
    DataTablesModule,
    QRCodeModule,
    NgxQRCodeModule,
    NgxMatSelectSearchModule,
    DemoMaterialModule,
    ExamManagementModule,
    FinanceServicesModule


  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
