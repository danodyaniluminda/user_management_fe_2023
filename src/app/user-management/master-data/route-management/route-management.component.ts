// import {Component, OnInit, ViewChild} from '@angular/core';
// import Swal from "sweetalert2";
// import {Router} from "@angular/router";
// import {MatPaginator} from "@angular/material/paginator";
// import {ReplaySubject, Subject, takeUntil} from "rxjs";
// import {FormControl} from "@angular/forms";
// import {close} from "fs";
//
// @Component({
//   selector: 'user-route-management',
//   templateUrl: './route-management.component.html',
//   styleUrls: ['./route-management.component.css']
// })
// export class RouteManagementComponent implements OnInit {
//
//   categorys: any;
//   dtOptions: DataTables.Settings = {};
//   constructor(
//     private routeManagementService:RouteManagementService,
//     private router:Router
//   ) { }
//
//   routes:any[] = [];
//
//   addButtonDisabled :boolean=true;
//   //transcripts: any[];
//   showTable: Boolean = false;
//   routeName:string ;
//   categoryId:number = -1;
//
//   displayedColumns = ['id','route_name', 'category','active', 'edit', 'delete']
//
//   age = 10;
//   showDiv=true;
//
//   @ViewChild('paginator') paginator!: MatPaginator;
//
//
//   hideDive(){
//     this.showDiv=false;
//   }
//
//   public filteredCategorys: ReplaySubject<any> = new ReplaySubject<any>(1);
//   public categoryFilterCtrl: FormControl = new FormControl('');
//   protected _onDestroy = new Subject<void>();
//
//   ngOnInit(): void {
//     this.fetchAllRoutes();
//     this.fetchAllCategorys();
//     this.search();
//     //console.log("specif",this.isShowSpecificField);
//
//     this.dtOptions = {
//       pagingType: 'full_numbers',
//       responsive: false,
//       paging: true,
//     };
//   }
//
//   fetchAllRoutes(){
//     this.routeManagementService.getAllRoute()
//       .toPromise()
//       .then((result:any) => {
//         this.routes = result;
//       })
//       .catch((exception:any) => {
//         alert(exception);
//       });
//   }
//   fetchAllCategorys() {
//     this.routeManagementService
//       .getAllCategorys()
//       .toPromise()
//       .then((result: any) => {
//         this.filteredCategorys.next(this.categorys);
//         console.log("All-categorys",result);
//         this.categorys = result;
//
//       })
//       .catch((exception:any) => {
//         alert(exception);
//       });
//   }
//
//   filterRoute($event:any){
//     this.addButtonDisabled = false;
//     let key = $event.target.value;
//     let filtered = this.routes.filter(route => route.name.includes(key));
//     console.log(filtered);
//
//   }
//
//   onCategoryChange(target:any){
//     this.categoryId = target.value;
//   }
//
//   addNewRoute(){
//     if(this.routeName==undefined || this.routeName.trim().length==0){
//       Swal.fire('route  name is empty!', 'Please enter the route name.', 'error');
//       return;
//     }
//     this.routeName = this.camelCaseText(this.routeName.trim());
//
//     let tmpFilteredroutes = this.routes.filter((tt: {name:any, type: any}) => tt.name == this.routeName.trim() && tt.type == this.routes);
//
//       this.routeManagementService.addNewRoute(this.routeName,this.categoryId,this.active)
//         .toPromise()
//         .then((result:any) => {
//           console.log(result);
//         })
//         .catch((exception:any) => {
//           alert(exception);
//         });
//     }
//
//   protected readonly close = close;
// }
//
//   showRouteNameError(): void{
//     let touched = !(this.routeName == undefined);
//     if(!touched){
//       return false;
//     }
//     let pattern: RegExp = /^[a-zA-Z ]+$/;
//     let patternMatch = pattern.test(this.routeName);
//     if(patternMatch==true){
//       this.addButtonDisabled=false;
//     }else {
//       this.addButtonDisabled=true;
//     }
//     return touched && !patternMatch;
//   }
//
//   search() {
//     this.showTable=false;
//     this.routeManagementService
//       .searchResponseToAPI()
//       .toPromise()
//       .then((message: any) => {
//         this.route = message;
//         console.log("test",message);
//
//         this.showTable = true;
//       });
//   }
//
//   archive(id:number) {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to undo this change!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire(
//           'Deleted!',
//           'The record has been deleted.',
//           'success'
//         )
//         this.routeManagementService.archiveRoute(id)
//           .toPromise()
//           .then((result:any) => {
//             console.log(result);
//
//           })
//           .catch((exception:any) => {
//             alert(exception);
//           });
//       }
//     })
//   }
//
//   close(){
//     this.router.navigate(['master-data/transcript-type-and-result-type']);
//   }
//
//   categoryChange(target:any) {
//     this.categoryId = target.value;
//     console.log(this.categorys);
//
//     this.filteredCategorys.next(this.categorys);
//     this.categoryFilterCtrl.valueChanges
//       .pipe(takeUntil(this._onDestroy))
//       .subscribe(() => {
//         this.filterCategorys();
//       });
//   }
//
//   filterCategorys(): void {
//     if (!this.categorys) {
//       return;
//     }
//     // get the search keyword
//     let search = this.categoryFilterCtrl.value;
//     if (!search) {
//       this.filteredCategorys.next(this.categorys.slice());
//       return;
//     } else {
//       search = search.toLowerCase();
//     }
//     this.filteredCategorys.next(
//       this.categorys.filter((category: { name: string; }) => category.name.toLowerCase().indexOf(search) > -1)
//     );
//   }
//
//   camelCaseText(word:string): string {
//     const words = word.split(' ');
//
//     const camelCaseWords = words.map((word) => {
//       return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
//     });
//
//     return camelCaseWords.join(' ');
//   }
//
// }
//

import { Component, OnInit } from '@angular/core';
import { ViewChild, TemplateRef } from '@angular/core';
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'user-route-management',
  templateUrl: './route-management.component.html',
  styleUrls: ['./route-management.component.css']
})

export class RouteManagementComponent implements OnInit  {

  constructor() {

  }

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


  ngOnInit(): void {

    //Set table options
    this.options = {
      //delete check box true if you dont want checkbox
      checkboxes: true,
      rowDetailTemplate:this.rowExpansion
    }



}
    //Get data from backend
    // setTimeout(() => {
    //
    //   //Get data from backend
    //   this.data = this.getData();
    //
    //   //Create boolean array
    //   this.showEditArray = Array.from({ length: this.data.length }, (value, index) => false);
    //
    // }, 3000);


 // }

  // onCheckboxClick(selectCheckBoxArr:any) {
  //   alert(JSON.stringify(selectCheckBoxArr));
  // }

  // public getData(){
  //   return [
  //     {
  //       "id": "1",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "2",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "3",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "4",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "5",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "6",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "7",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "8",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "9",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "10",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "11",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "12",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "13",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "14",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "15",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "16",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "17",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "18",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "19",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "20",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "21",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "22",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "23",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "24",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     },
  //     {
  //       "id": "25",
  //       "routename": "exam",
  //       "category": "Exam management",
  //       "activestatus": "true"
  //     }
  //   ];
  // }




}

