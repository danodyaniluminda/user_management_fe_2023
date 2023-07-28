import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'completion-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent implements OnInit {

  tooltipText: string = 'Please Enter Student ID';
  isCardOpen: boolean = false;
  isCardOpenViewResult: boolean = false;
  isCardOpenViewFailedRecords: boolean = false;
  isCardOpenViewLog: boolean = false;

  dtOptions: DataTables.Settings = {};
  toggleCard(): void {
    this.isCardOpen = !this.isCardOpen;
  }

//to view result
  viewResult(): void {
    this.isCardOpenViewResult = !this.isCardOpenViewResult;
  }

  //to view failed records
  viewFailedRecords(): void {
    this.isCardOpenViewFailedRecords = !this.isCardOpenViewFailedRecords;
  }

  //to view log details
  viewLog(): void {
    this.isCardOpenViewLog = !this.isCardOpenViewLog;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
