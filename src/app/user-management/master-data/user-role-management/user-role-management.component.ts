import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'user-user-role-management',
  templateUrl: './user-role-management.component.html',
  styleUrls: ['./user-role-management.component.css']
})
export class UserRoleManagementComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  showUserRoleTable: boolean = false;
  filteredUserRole: any;

  //Below are the variables of table
  @ViewChild('rowExpansion', { static: true }) rowExpansion: TemplateRef<any>;
  options = {}
  data:any = [];
  showEditArray:boolean[] = [];
  columns = [
    { key: 'userId', title: "User Name", width: 50, sorting: true },
    { key: 'roleId', title: 'User Role', width: 100},
    { key: 'status', title: 'Active Status',  align: { head: 'center' }, width: 120, sorting: true, noWrap: { head: true, body: true } },

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
        "userId": "1",
        "roleId": "Brendan",
        "status": "1-724-406-2487",

      },
      {
        "userId": "2",
        "roleId": "Warren",
        "status": "1-412-485-9725",
      },
      {
        "id": "3",
        "name": "qwBrendan",
        "phone": "1-724-406-2487",
        "company": "YEnim Commodo Limited",

      },
      {
        "id": "4",
        "name": "rarren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",

      },
      {
        "id": "5",
        "name": "dssendan",
        "phone": "1-724-406-2487",
        "company": "Enim Commodo Limited",

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
        "id": "9",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "Enim Commodo Limited",

      },
      {
        "id": "10",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",

      },

    ];
  }

}
