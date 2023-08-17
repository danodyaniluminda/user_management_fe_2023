import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';





interface Role {
  Rname: any;
  status: any;
  category: any;
}

interface Route {
  delete: boolean;
  edit: boolean;
  add: boolean;
  id: any;
  RouteName: any;
  category_id: any;
}

interface RoleRoute {
  delete: boolean;
  edit: boolean;
  add: boolean;
  id: any;
  routId: any;
  roleId: any;
}


@Component({
  selector: 'app-add-new-role',
  templateUrl: './add-new-role.component.html',
  styleUrls: ['./add-new-role.component.css']
})
export class AddNewRoleComponent implements OnInit {
  displayedColumns3: string[] = ['route_name', 'role_route_name', 'role_name', 'permissions'];
  selectedCategory: string;
  roleroutes: RoleRoute[]
  dataSource3: MatTableDataSource<RoleRoute>;
  filteredData: RoleRoute[] = [];
  categoryNames: string[];
  categoryInfoList: any[];






  constructor(private http: HttpClient, private router: Router) { }

  cancelRole() {
    // Reset the form or navigate back
    console.log('Role creation canceled');
    this.resetFilter();



  }

  onClickBack() {
    this.router.navigate(['/user-management/master-data/role-management']);
  }

  resetFilter(): void {
    this.selectedCategory = '';
    this.filteredData = this.roleroutes;
    this.dataSource3.data = this.filteredData;
  }

  logData(row: any) {
    console.log(row);
  }

  ngOnInit(): void {
    // this.getRoute();
    this.getRoleroutes();
    this.getcategory()


  }
  cancelEdit() {
    // Reset the form or navigate back
    console.log('Role Edit canceled');


  }

  applyFilter(): void {
    if (this.selectedCategory) {
      this.filteredData = this.roleroutes.filter(roleroute => roleroute.roleId.categoryId.id === this.selectedCategory);
    } else {
      this.filteredData = this.roleroutes;
    }
    this.dataSource3.data = this.filteredData;
  }

  selectAll: { [key: string]: boolean } = {};
  addChecked: { [key: string]: boolean } = {};
  editChecked: { [key: string]: boolean } = {};
  deleteChecked: { [key: string]: boolean } = {};

  onAllCheckboxChange(event: any, id: any) {
    console.log('All checkbox changed:', event.checked);
    const checked = event.checked;

    this.addChecked[id] = checked;
    this.editChecked[id] = checked;
    this.deleteChecked[id] = checked;

    // Construct the request body
    const requestBody = {
      add: checked,
      edit: checked,
      delete: checked
    };

    this.http.put<boolean>('http://localhost:8081/api/user_management/updateRoleRouteAll/' + id + '/true/true/true', '')
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
  onAddCheckboxChange(event: any, id: any) {
    console.log('Add checkbox changed:', event.checked);

    const routeData = {
      add: event.checked
    };

    // Construct the request body
    const requestBody = {
      add: routeData.add
    };

    this.http.put<boolean>('http://localhost:8081/api/user_management/updateRoutesAdd/' + id, requestBody)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  onEditCheckboxChange(event: any, id: any) {
    console.log('Edit checkbox changed:', event.checked);

    const routeData = {

      edit: event.checked,

    };

    // Construct the request body
    const requestBody = {

      edit: routeData.edit,

    };

    this.http.put<boolean>('http://localhost:8081/api/user_management/updateRoleRouteEdit/' + id, requestBody)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  onDeleteCheckboxChange(event: any, id: any) {
    console.log('Delete checkbox changed:', event.checked);

    const routeData = {
      delete: event.checked,

    };

    // Construct the request body
    const requestBody = {
      delete: routeData.delete,

    };

    this.http.put<boolean>('http://localhost:8081/api/user_management/updateRoleRouteDelete/' + id, requestBody)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  onAddNew(role: { Rname: string, category: string, status: string, categorydetails: string }): void {
    console.log(role);
    const roleData = {
      id: 5, // generate id 
      'role-name': role.Rname,
      categorydetails: role.category,
      status: true
    };

    this.http.post<boolean>('http://localhost:8081/api/user_management/roles/' + roleData.id + '/' + roleData['role-name'] + '/' + roleData.categorydetails + '/' + roleData.status, {})
      .subscribe(
        (response) => {
          console.log(response);
          this.getRoleroutes(); // Fetch roles after adding a new role

          //clear forms after click save
          role.Rname = '';
          this.selectedCategory = '';
          role.status = '';
          role.categorydetails = '';
          Swal.fire({
            title: 'Success!',
            text: 'Role  Successfully.',
            icon: 'success',
          }).then(() => {
            location.reload();
          });
        },
        (error) => {
          console.error('Error:', error);
          Swal.fire('Error...', 'Unknown Error ', 'error');
        }
      );
  }

  getRoleroutes(): void {
    this.http.get<RoleRoute[]>('http://localhost:8081/api/user_management/getAllRolerRouteNames').subscribe(
      (response: RoleRoute[]) => {
        this.roleroutes = response;
        this.dataSource3 = new MatTableDataSource<RoleRoute>(this.roleroutes);
        // this.filteredData = this.roleroutes;
        // this.dataSource2 = new MatTableDataSource<Route>(this.filteredData);
        console.log('role routes are', this.roleroutes);
        this.roleroutes.forEach((roleroute) => {
          this.addChecked[roleroute.id] = roleroute.add;
          this.editChecked[roleroute.id] = roleroute.edit;
          this.deleteChecked[roleroute.id] = roleroute.delete;

          if (this.addChecked[roleroute.id] && this.editChecked[roleroute.id] && this.deleteChecked[roleroute.id]) {
            this.selectAll[roleroute.id] = true;
          }
        });

      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getcategory() {
    this.http.get<any[]>('http://localhost:8081/api/user_management/getAllCategoryNames').subscribe(
      (categoryInfoList: any[]) => {
        this.categoryInfoList = categoryInfoList;
        console.log(this.categoryInfoList);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

}
