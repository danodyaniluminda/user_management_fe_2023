// @ts-ignore
import {Component, Injectable, OnInit, NgModule, ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource,} from '@angular/material/table';
import {Router} from '@angular/router';
import {DayQuotaAllocationService} from "./day-quota-allocation.service";
import {FormControl, FormGroup} from "@angular/forms";

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

  updateProgramme(arg0: any, arg1: any) {
    throw new Error('Method not implemented.');
  }

  programmequotas: any;

  updateVoucher(arg0: any, arg1: any) {
    throw new Error('Method not implemented.');
  }

  allProgrammes: any = [];
  allNormalQuota: any = [];
  programme: any = [];
  programmes: [] = [];
  onedayquota: [] = [];
  normalquota: [] = [];
  dtOptions: DataTables.Settings = {};
  allDayQuotaAllocation: any;
  filteredDayQuotaAllocation: any;
  filteredNormalQuotaAllocation:any;
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
  servicetype: any;
  showTable: boolean = false;
  available_quota: any;
  element: any;
  one_day_quota: any;
  normal_quota: any


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
    this.dataSource1.paginator = this.paginator1;
    this.dataSource2.paginator = this.paginator;
  }


  @ViewChild('paginator') paginator!: MatPaginator;
  paginator1!: MatPaginator;
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
    if (value == 'normal') {
      this.showNormalTable = true;
      this.showExpressTable = false;
    } else if (value == 'express') {
      this.showExpressTable = true;
      this.showNormalTable = false;
    }
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

  fetchDayQuotaAllocationDetails() {
    this.dayQuotaAllocationService
      .getDayQuotaAllocation()
      .toPromise()
      .then((result: any) => {
        this.allDayQuotaAllocation = result;
        console.log("allDayQuotaAllocation", result);
        this.dataSource1 = new MatTableDataSource(this.allDayQuotaAllocation);
        this.showTable = true;
        this.dataSource1.paginator = this.paginator1;
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
        this.dataSource2 = new MatTableDataSource(this.allNormalQuota);
        this.showTable = true;
        this.dataSource2.paginator = this.paginator;
        setTimeout(() => {
        }, 1000);
      });
  }

  search() {

  if (this.showNormalTable)  {this.filteredNormalQuotaAllocation = this.allNormalQuota.filter((element:any) => {
      return element['programme']['name'].includes(String(this.programmeInput))
    });
    this.dataSource2 = new MatTableDataSource(this.filteredNormalQuotaAllocation);
    this.showTable = true;
    this.dataSource1.paginator = this.paginator;}
else{
    this.filteredDayQuotaAllocation = this.allDayQuotaAllocation.filter((element:any) => {
      return element['programme']['name'].includes(String(this.programmeInput))
    });
    this.dataSource1 = new MatTableDataSource(this.filteredDayQuotaAllocation);
    this.showTable = true;
    this.dataSource1.paginator = this.paginator;}
  }


}



