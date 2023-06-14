import { Component, OnInit } from '@angular/core';
import {GatewayManagementService} from "../gateway-management.service";
import {GatewayRoutesModel} from "./gateway-routes.model";

@Component({
  selector: 'app-gateway-routes',
  templateUrl: './gateway-routes.component.html',
  styleUrls: ['./gateway-routes.component.css']
})
export class GatewayRoutesComponent implements OnInit {

  gatewayRoutesModel:GatewayRoutesModel = new GatewayRoutesModel();
  dtOptions: DataTables.Settings = {};
  showTable: boolean = false;

  constructor(private gatewayManagementService:GatewayManagementService) { }

  ngOnInit(): void {
    this.gatewayManagementService.gatewayRoutesModel = this.gatewayRoutesModel;
    this.getAllGatewayRoutes();
    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: false,
      paging: true,
      scrollX:true
    };
  }

  getAllGatewayRoutes(){
    this.gatewayManagementService.getAllGatewayRoutes()?.toPromise()
      .then(
        (data:any) => {
          console.log(data);
          this.gatewayRoutesModel.allGatewayRoutes = data;
          this.showTable = true;
        }
      )
      .catch(
        (error:any) => {

        }
      );
  }

}
