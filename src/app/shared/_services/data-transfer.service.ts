import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() { }

  private _data: any;
  
  public get data(): any {
    return this._data;
  }
  public set data(value: any) {
    this._data = value;
  }

  private _dataType: String = "";
  
  public get dataType(): String {
    return this._dataType;
  }
  public set dataType(value: String) {
    this._dataType = value;
  }
  

}
