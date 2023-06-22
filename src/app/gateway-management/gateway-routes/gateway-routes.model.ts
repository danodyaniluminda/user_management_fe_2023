
export class GatewayRoutesModel{

  private _allGatewayRoutes:any = [];
  private _allGatewayRoutesModified:any = [];
  private _allRoles:any = [];
  get allGatewayRoutes(): any {
    return this._allGatewayRoutes;
  }
  set allGatewayRoutes(value: any) {
    this._allGatewayRoutes = value;
  }
  get allGatewayRoutesModified(): any {
    return this._allGatewayRoutesModified;
  }
  set allGatewayRoutesModified(value: any) {
    this._allGatewayRoutesModified = value;
  }
  get allRoles(): any {
    return this._allRoles;
  }
  set allRoles(value: any) {
    this._allRoles = value;
  }

}
