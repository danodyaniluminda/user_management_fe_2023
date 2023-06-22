import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import {GatewayManagementService} from "../gateway-management.service";
import {GatewayRoutesModel} from "./gateway-routes.model";

@Component({
  selector: 'app-checkbox',
  templateUrl: './gateway-routes.component.html',
  styleUrls: [ './gateway-routes.component.css' ]

})

export class GatewayRoutesComponent implements OnInit  {

  gatewayRoutesModel:GatewayRoutesModel = new GatewayRoutesModel();

  //Below are the variables of table
  @ViewChild('rowExpansion', { static: true }) rowExpansion: TemplateRef<any>;
  options = {}
  showEditArray:boolean[] = [];
  columns = [
    { key: 'id', title: "ID", sorting: true, orderBy : {
        order: 'asc',
        key: 'id'
      } },
    { key: 'routeId', title: 'Route ID <br>( Route Name )'},
    { key: 'authorizationRequired', title: 'Authorization<br>Required' },
    { key: 'path', title: 'Path<br>( External path \'\'Frontend &#8594; Gateway\'\' )', sorting: true, align: { head: 'left', body: 'left' }, noWrap: {body: true } },
    { key: 'uri', title: 'URI<br>( Internal path \'\'Gateway &#8594; Microservice\'\' )', pinned: false, noWrap: {body: true } },
    { key: 'rolesAllowed', title: 'Roles Allowed', pinned: false, noWrap: {body: true } },
  ];

  constructor(private gatewayManagementService:GatewayManagementService) { }
  ngOnInit(): void {

    //Set table options
    this.options = {
      rowDetailTemplate:this.rowExpansion,
    }

    //Get data from backend
    this.gatewayManagementService.gatewayRoutesModel = this.gatewayRoutesModel;
    this.getAllGatewayRoutes();
    this.getAllRoles();

  }


  getAllGatewayRoutes(){
    this.gatewayManagementService.getAllGatewayRoutes()?.toPromise()
      .then(
        (data:any) => {
          console.log(data);
          this.showEditArray = Array.from({ length: data.length }, (value, index) => false);
          this.gatewayRoutesModel.allGatewayRoutes = data;
          this.gatewayRoutesModel.allGatewayRoutesModified = data;
        }
      )
      .catch(
        (error:any) => {
        }
      );
  }

  getAllRoles(){
    this.gatewayManagementService.getAllRoles()?.toPromise()
      .then(
        (data:any) => {
          console.log("Roles : " , data);
          this.gatewayRoutesModel.allRoles = data;
        }
      )
      .catch(
        (error:any) => {
        }
      );
  }

  onCheckboxClick(selectCheckBoxArr:any) {
    alert(JSON.stringify(selectCheckBoxArr));
  }

}
