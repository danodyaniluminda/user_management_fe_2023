import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'user-route-management',
  templateUrl: './route-management.component.html',
  styleUrls: ['./route-management.component.css']
})

export class RouteManagementComponent implements OnInit  {

  //Below are the variables of table
  @ViewChild('rowExpansion', { static: true }) rowExpansion: TemplateRef<any>;
  options = {}
  data:any = [];
  showEditArray:boolean[] = [];
  columns = [
    { key: 'id', title: "ID", width: 50, sorting: true },
    { key: 'routename', title: 'Route Name', width: 100},
    { key: 'category', title: 'Category', width: 300, sorting: true, noWrap: { head: true, body: true } },
    { key: 'activestatus', title: 'Active Status', width: 200, noWrap: { head: true, body: true } },

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
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "2",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "3",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "4",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "5",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "6",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "7",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "8",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "9",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "10",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "11",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "12",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "13",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "14",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "15",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "16",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "17",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "18",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "19",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "20",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "21",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "22",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "23",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "24",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      },
      {
        "id": "25",
        "routename": "exam",
        "category": "Exam management",
        "activestatus": "true"
      }
    ];
  }




}

