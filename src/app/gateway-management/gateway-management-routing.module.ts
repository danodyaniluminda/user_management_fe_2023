import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GatewayRoutesComponent} from "./gateway-routes/gateway-routes.component";

const routes: Routes = [
  {
    path:'gateway/gateway-routes',
    component:GatewayRoutesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GatewayManagementRoutingModule { }
