import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'app-checkbox',
  templateUrl: './gateway-routes.component.html',
  styleUrls: [ './gateway-routes.component.css' ]

})

export class GatewayRoutesComponent implements OnInit  {

  //Below are the variables of table
  @ViewChild('rowExpansion', { static: true }) rowExpansion: TemplateRef<any>;
  options = {}
  data:any = [];
  showEditArray:boolean[] = [];
  columns = [
    { key: 'id', title: "ID", width: 50, sorting: true },
    { key: 'name', title: 'Name', width: 100},
    { key: 'phone', title: 'Phone',  align: { head: 'center' }, width: 120, sorting: true, noWrap: { head: true, body: true } },
    { key: 'company', title: 'Company', width: 300, sorting: true, align: { head: 'left', body: 'right' }, noWrap: { head: true, body: true } },
    { key: 'date', title: 'Date', width: 100, sorting: false, pinned: false },
    { key: 'phone', title: 'Phone' ,width: 120},
    { key: 'company', title: 'Company', width: 200, noWrap: { head: true, body: true } },
    { key: 'zip', title: 'ZIP', sorting: false, width: 120 }
  ];

  constructor() { }
  ngOnInit(): void {

    //Set table options
    this.options = {
      //delete check box true if you dont want checkbox
      checkboxes: true,
      rowDetailTemplate:this.rowExpansion
    }

    //Get data from backend
    setTimeout(() => {

      //Get data from backend
      this.data = this.getData();

      //Create boolean array
      this.showEditArray = Array.from({ length: this.data.length }, (value, index) => false);

    }, 3000);


  }

  onCheckboxClick(selectCheckBoxArr:any) {
    alert(JSON.stringify(selectCheckBoxArr));
  }

  public getData(){
    return [
      {
        "id": "1",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "ZEnim Commodo Limited Enim Commodo Limited Enim Commodo LimitedEnim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "2",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "ZOdio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "3",
        "name": "qwBrendan",
        "phone": "1-724-406-2487",
        "company": "YEnim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "4",
        "name": "rarren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "5",
        "name": "dssendan",
        "phone": "1-724-406-2487",
        "company": "Enim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "6",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "7",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "Enim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "8",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "9",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "Enim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "10",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "11",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "Enim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "12",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "13",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "Enim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "14",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "15",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "Enim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "16",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "17",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "Enim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "18",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "19",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "Enim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "20",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "21",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "Enim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "22",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "23",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "Enim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "24",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "25",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "ZEnim Commodo Limited Enim Commodo Limited Enim Commodo LimitedEnim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      }
    ];
  }




}
