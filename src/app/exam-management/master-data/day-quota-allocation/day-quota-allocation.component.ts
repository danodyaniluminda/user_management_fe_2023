// @ts-ignore
import {Component, Injectable, OnInit, NgModule, ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource,} from '@angular/material/table';
import {Router} from '@angular/router';
import {DayQuotaAllocationService} from "./day-quota-allocation.service";
import {FormControl, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'exam-day-quota-allocation',
  templateUrl: './day-quota-allocation.component.html',
  styleUrls: ['./day-quota-allocation.component.css']
})
export class DayQuotaAllocationComponent implements OnInit, AfterViewInit {

  getOneDayQuotaAllocations() {
    throw new Error('Method not implemented.');
  }

  UpdateOneDayQuota(arg0: any) {
    throw new Error('Method not implemented.');
  }

  onStatusTypeChange(_t55: any, arg1: string) {
    throw new Error('Method not implemented.');
  }

  updateQuota(row: any) {
    let quota_id = row['id'];
    let programme_id = row['programme']['id'];

    console.log("quota_id : " + quota_id);
    console.log("programme_id : " + programme_id);


    if (this.servicetype == 'express') {
      let one_day_quota_value = 0;
      if (this.selectedOneDayQuotaValue == '') {
        one_day_quota_value = row['one_day_quota'];
      } else {
        one_day_quota_value = Number(this.selectedOneDayQuotaValue);
      }
      console.log("one_day_quota_value : " + one_day_quota_value);
      console.log("servicetype : " + this.servicetype);
      this.dayQuotaAllocationService
        .updateQuotaValue(quota_id, one_day_quota_value, programme_id, this.servicetype)
        .toPromise()
        .then((result: any) => {
          console.log(result);
          if(result.startsWith("success")){
            Swal.fire("Success", result, "success");
          }else{
            Swal.fire("Error", result, "error");
          }
        });
    } else if (this.servicetype == 'normal') {
      let normal_quota_value = 0;
      if (this.selectedNormalQuotaValue == '') {
        normal_quota_value = row['normal_quota'];
      } else {
        normal_quota_value = Number(this.selectedNormalQuotaValue);
      }
      console.log("normal_quota_value : " + normal_quota_value);
      this.dayQuotaAllocationService
        .updateQuotaValue(quota_id, normal_quota_value, programme_id, this.servicetype)
        .toPromise()
        .then((result: any) => {
          console.log( result);
          if(result.startsWith("success")){
            Swal.fire("Success", result, "success");
          }else{
            Swal.fire("Error", result, "error");
          }
        });

    }

  }

  programmequotas: any;

  updateVoucher(arg0: any, arg1: any) {
    throw new Error('Method not implemented.');
  }

  allProgrammes: any = [];
  allNormalQuota: any = [];
  programme: any = [];
  programmes: [] = [];

  selectedOneDayQuotaValue: string = "";
  selectedNormalQuotaValue: string = "";

  onQuotaInputChange(target: any, type: any) {
    if (type == 'express') {
      if (target && target.value != undefined) {
        this.selectedOneDayQuotaValue = target.value;
        console.log("selectedOneDayQuotaValue : ", this.selectedOneDayQuotaValue);
      }
    } else if (type == 'normal') {
      if (target && target.value != undefined) {
        this.selectedNormalQuotaValue = target.value;
        console.log("selectedNormalQuotaValue : ", this.selectedNormalQuotaValue);
      }
    }
  }

  dtOptions: DataTables.Settings = {};
  allDayQuotaAllocation: any;
  filteredDayQuotaAllocation: any;
  filteredNormalQuotaAllocation: any;
  viewDayQuotaAllocationService: any;
  one_day_quotas: any;
  transcript_one_day_quota: any;
  programmeId: number = 0;
  dayQuotaAllocation: any;
  dayQuotaAllocations: any;
  StatusTypes: any;
  filteredProgrammes: any = [];
  showExpressTable: boolean = true;
  showNormalTable: boolean;
  servicetype: any = "express";
  showTable: boolean = false;
  available_quota: any;
  element: any;
  one_day_quota: any;
  normal_quota: any;


  form = new FormGroup({

    programme: new FormControl(),
    quota: new FormControl(),
    status: new FormControl(),
    verify: new FormControl(),


  });


  programmeInput!: String;


  constructor(
    private dayQuotaAllocationService: DayQuotaAllocationService,
    private router: Router,
  ) {
  }


  ngAfterViewInit(): void {
    this.dataSource2.paginator = this.paginator;
    // this.dataSource1.paginator = this.paginator;
  }

//datasource1 is for express service

  // @ViewChild('paginator1') paginator!: MatPaginator;
  @ViewChild('paginator') paginator!: MatPaginator;

  dataSource1 = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();
  displayedColumns: string[] = ['programmeName', 'quota', 'status', 'verify'];


  ngOnInit(): void {
    this.fetchAllProgrammeDetails();
    this.fetchDayQuotaAllocationDetails();
    this.fetchNormalQuotaDetails();

    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: false,
      paging: true,
    };
  }

  changeServiceType(target: any) {
    let value = target.value;
    console.log(value);
    this.servicetype = value;
    if (value == 'normal') {
      this.showNormalTable = true;
      this.showExpressTable = false;
    } else if (value == 'express') {
      this.showExpressTable = true;
      this.showNormalTable = false;
    }
    //Swal.fire("Service Changed", value, "success");
    //Swal.fire("Service Changed", value, "error");
  }


  fetchAllProgrammeDetails() {
    this.dayQuotaAllocationService
      .getAllProgrammes()
      .toPromise()
      .then((result: any) => {
        console.log("fetchAllProgrammeDetails", result);
        this.allProgrammes = result;
      });
  }


  filterProgramme() {
    this.filteredProgrammes = this.allProgrammes.filter((tt: {
      name: string
    }) => tt.name.toLowerCase().includes(this.programmeInput.toLowerCase()));
    console.log(this.filteredProgrammes.map((ftt: { name: any; }) => ftt.name))
  }


  getProgramme(value: any) {
    let programme = this.filteredProgrammes.filter((tt: {
      name: string
    }) => tt.name.toLowerCase() == value.toLowerCase())[0];
    let programmeId = programme.id;
    let programmeName = programme.name;
    console.log("programmeId - ", programmeId);
    console.log("programmeName - ", programmeName);
  }

  genProgrammeValue(filteredProgramme: any) {
    return filteredProgramme.name
  }

  onProgrammeChange(value: any) {
    alert()
    // this.eligibilityTranscriptTypes[index] = value;
    console.log("TEST R", this.programmeInput);

  }

  // fetchDayQuotaAllocationDetails is use for express/one day quota
  elements: any;
  row: string;
  allDayQuotaAllocations: any;

  fetchDayQuotaAllocationDetails() {
    this.dayQuotaAllocationService
      .getDayQuotaAllocation()
      .toPromise()
      .then((result: any) => {
        this.allDayQuotaAllocation = result;
        console.log("allDayQuotaAllocation", result);
        // this.dataSource1 = new MatTableDataSource(this.allDayQuotaAllocation);
        this.showTable = true;
        // this.dataSource1.paginator = this.paginator;
        setTimeout(() => {
        }, 1000);
      });
  }

  fetchNormalQuotaDetails() {
    this.dayQuotaAllocationService
      .getNormalQuotaAllocations()
      .toPromise()
      .then((result: any) => {
        this.allNormalQuota = result;
        console.log("allNormalQuota", result);
        // this.dataSource2 = new MatTableDataSource(this.allNormalQuota);
        this.showTable = true;
        // this.dataSource2.paginator = this.paginator;
        setTimeout(() => {
        }, 1000);
      });
  }

  search() {

    if (this.showNormalTable) {
      this.filteredNormalQuotaAllocation = this.allNormalQuota.filter((element: any) => {
        return element['programme']['name'].includes(String(this.programmeInput))
      });
      // this.dataSource2 = new MatTableDataSource(this.filteredNormalQuotaAllocation);
      this.showTable = true;
      // this.dataSource2.paginator = this.paginator;
    } else {
      this.filteredDayQuotaAllocation = this.allDayQuotaAllocation.filter((element: any) => {
        return element['programme']['name'].includes(String(this.programmeInput))
      });
      // this.dataSource1 = new MatTableDataSource(this.filteredDayQuotaAllocation);
      this.showTable = true;
      // this.dataSource1.paginator = this.paginator;
    }
  }


}



