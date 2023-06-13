
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule, LocationStrategy, PathLocationStrategy, DatePipe } from '@angular/common';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SpinnerComponent } from './shared/spinner.component';
import {DataTablesModule} from "angular-datatables";
import {QRCodeModule} from "angularx-qrcode";
import {NgxQRCodeModule} from "@techiediaries/ngx-qrcode";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import { ExamManagementModule } from './exam-management/exam-management.module';
import { FinanceServicesModule } from './finance-services/finance-services.module';
import { SidenavComponent } from './layouts/full/sidenav/sidenav.component';
import {AppRoutingModule} from "./app-routing.module";
import {SublevelMenuComponent} from "./layouts/full/sidenav/sublevel-menu.component";
import { NotFoundComponent } from './layouts/error/not-found/not-found.component';
import { SamplePipe } from './layouts/error/sample.pipe';
import { UserManagementModule } from './user-management/user-management.module';
import { TranscriptViewComponent } from './layouts/transcript-details/transcript-view.component';
import {DashboardAccess, PermissionGuardService} from "./shared/services/ValidatePrivileges";
import { AccessDeniedComponent } from './layouts/error/access-denied/access-denied.component';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    SidenavComponent,
    SublevelMenuComponent,
    NotFoundComponent,
    SamplePipe,
    TranscriptViewComponent,
    AccessDeniedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    QRCodeModule,
    NgxQRCodeModule,
    NgxMatSelectSearchModule,
    DemoMaterialModule,
    ExamManagementModule,
    FinanceServicesModule,
    UserManagementModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    DashboardAccess,
    PermissionGuardService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
