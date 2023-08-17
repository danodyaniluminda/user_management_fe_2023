import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';



interface Role {
  Rname: any;
  status: any;
  category: any;
}

@Component({
  selector: 'user-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {

  displayedColumns: string[] = ['Rname', 'status', 'category', 'actions'];
  selectedCategory: string;
  roles: Role[];
  categoryNames: string[];
  dataSource: MatTableDataSource<Role>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  categoryInfoList: any[];

  @ViewChild('rowExpansion', { static: true }) rowExpansion: TemplateRef<any>;
  options = {}
  data:any = [];
  showEditArray:boolean[] = [];
  columns = [
    { key: 'id', title: "ID", sorting: true },
    { key: 'roleName', title: 'Role Name'},
    { key: 'active', title: 'Status'},
    { key: 'categoryId_categoryName', title: 'Category',}
  ];


  constructor(private http: HttpClient, private router: Router) { }

  // cancelRole() {
  //   // Reset the form or navigate back
  //   console.log('Role creation canceled');
  //   this.visible = !this.visible;
  //   this.expanded = false;
    
  // }
  

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  logData(row: any) {
    console.log(row);
  }

  ngOnInit(): void {


    this.options = {
      //delete check box true if you dont want checkbox
      rowDetailTemplate:this.rowExpansion
    }
    this.getRoles();
    this.showEditArray = Array.from({ length: this.data.length }, (value, index) => false);
  }

  AddNewRole: boolean = true;
  visible: boolean = false;
  expanded: boolean = false;
  expandedit: boolean = false;
  visibleUpdate: boolean = false;
  editclick:boolean = true;

  onClickAdd() {
    this.router.navigate(['/user-management/master-data/role-management/add-new-role']);
  }




  onClickEdit() {
    // this.editclick = !this.editclick;
    // this.visibleUpdate = !this.visibleUpdate;
    // this.expandedit = true;
    // this.expanded = false;

   
  }
  cancelEdit() {
    // Reset the form or navigate back
    console.log('Role Edit canceled');
    // this.visibleUpdate = !this.visibleUpdate;
    // this.expandedit = false;
    // this.editclick = !this.editclick;
  }

  // onKeyPress(event: KeyboardEvent) {
  //   if (event.key === 'Enter') {
  //     const filterValue = (event.target as HTMLInputElement).value;
  //     this.applyFilter(filterValue);
  //   }
  // }

  deleteElement(element: any) {
    console.log('Delete element:', element);
    const url = `http://localhost:8081/api/user_management/deleteRoles/${element.id}`;
    this.http.delete(url)
      .subscribe(
        () => {
          console.log('Element deleted successfully');
          this.getRoles(); // Fetch updated roles after deletion
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
  

  

  // onAddNew(role: { Rname: string, category: string, status: string,categorydetails: string }): void {
  //   console.log(role);
  //   const roleData = {
  //     id: 5, // generate id 
  //     'role-name': role.Rname,
  //     categorydetails: role.category,
  //     status: true
  //   };

  //   this.http.post<boolean>('http://localhost:8081/api/user_management/roles/' + roleData.id + '/' + roleData['role-name'] + '/' + roleData.categorydetails + '/' + roleData.status, {})
  //     .subscribe(
  //       (response) => {
  //         console.log(response);
  //         this.getRoles(); // Fetch roles after adding a new role

  //       //clear forms after click save
  //       role.Rname = '';
  //       this.selectedCategory = '';
  //       role.status = '';
  //       role.categorydetails = '';
  //       },
  //       (error) => {
  //         console.error('Error:', error);
  //       }
  //     );
  // }

  getRoles() {
    this.http.get<Role[]>('http://localhost:8081/api/user_management/getAllRoles').subscribe(
      (response:any) => {
        response = response.map((row:any) => ({
          id : row['id'],
          roleName : row['roleName'],
          categoryId : row['categoryId'],
          categoryId_id : row['categoryId']['id'],
          categoryId_categoryName : row['categoryId']['categoryName'],
          active : row['active']

        }));
        this.roles = response;
        this.dataSource = new MatTableDataSource<Role>(this.roles);
        this.dataSource.paginator = this.paginator;
        console.log(this.roles);
        
        this.http.get<any[]>('http://localhost:8081/api/user_management/getAllCategoryNames').subscribe(
          (categoryInfoList: any[]) => {
            this.categoryInfoList = categoryInfoList;
            console.log(this.categoryInfoList);
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onUpdate(role: { id: number, Rname: string, category: string, status: string, categorydetails: string }): void {
    const roleData = {
      id: role.id,
      'role-name': role.Rname,
      categorydetails: role.category,
      status: role.status
    };

    this.http.put<boolean>('http://localhost:8081/api/user_management/updateRoles/' + roleData.id + '/' + roleData['role-name'] + '/' + roleData.categorydetails + '/' + roleData.status, {})
      .subscribe(
        (response) => {
          console.log(response);
          this.getRoles(); // Fetch roles after updating a role
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
  
  
}
