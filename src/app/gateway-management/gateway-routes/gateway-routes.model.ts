
export class GatewayRoutesModel{

  private _allGatewayRoutes:any = [];
  get allGatewayRoutes(): any {
    return this._allGatewayRoutes;
  }

  set allGatewayRoutes(value: any) {
    this._allGatewayRoutes = value;
  }
}
