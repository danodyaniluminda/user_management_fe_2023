import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Observable, ReplaySubject, Subject, take, takeUntil} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {MatSelect} from "@angular/material/select";

import {HttpClient} from "@angular/common/http";
import {GenerateTranscriptDataTransferService} from "../generate-transcript-data-transfer.service";
import {Router} from "@angular/router";
import {ViewTranscriptRequestDetailsService} from "./view-transcript-request-details.service";

@Component({
  selector: 'exam-view-transcript-request-details',
  templateUrl: './view-transcript-request-details.component.html',
  styleUrls: ['./view-transcript-request-details.component.css']
})
export class ViewTranscriptRequestDetailsComponent implements OnInit {


  formData : Observable<Array<any>>

  @Output() isDisabled = new EventEmitter<Boolean>();

  dtOptions: DataTables.Settings = {};
  showTable: Boolean = false;
  isChecked = false;
  transcripts: any[];
  value = '';
  options: any = [];
  isLoading = true;
  showSelect = false;

  form = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
    nic: new FormControl(),
    programme: new FormControl(),
    status: new FormControl(),
    transcriptType: new FormControl(),
    service: new FormControl(),
  });

  public filteredProgrammes: ReplaySubject<any> = new ReplaySubject<any>(1);
  public programmeFilterCtrl: FormControl = new FormControl('');
  protected _onDestroy = new Subject<void>();
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  programmes: any;
  transcriptTypes: any;
  serviceTypes: any;
  statuses: any;
  buttonShow: boolean = false;

  constructor(private viewTranscriptRequestDetailsService: ViewTranscriptRequestDetailsService,
              private _httpClient: HttpClient,
              private generateTranscriptDataTransferService: GenerateTranscriptDataTransferService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.fetchAllProgrammes();
    this.programmeChange()
    this.fetchAllTranscriptTypes()
    this.fetchAllServiceTypes();
    this.fetchAllStatusesTypes();

    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: false,
      paging: true,
    };


  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngAfterViewInit() {
    //this.setInitialValue();

  }

  get fromDate() {
    const fd = this.form.get('fromDate');
    if (fd) {
      return fd.value;
    } else {
      return null;
    }
  }

  get toDate() {
    const td = this.form.get('toDate');
    if (td) {
      return td.value;
    } else {
      return null;
    }
  }


  fetchAllProgrammes() {
    this.viewTranscriptRequestDetailsService
      .getAllProgrammes()
      .toPromise()
      .then((result: any) => {
        this.isLoading = false;
        this.programmes = result;
        this.filteredProgrammes.next(this.programmes);
        this.showSelect = true;
        console.log("array data", this.programmes);
      }, error => this.isLoading = false);
  }

  fetchAllTranscriptTypes() {
    this.viewTranscriptRequestDetailsService
      .getAllTranscriptTypes()
      .toPromise()
      .then((result: any) => {
        // console.log(result);
        this.transcriptTypes = result;
      });
  }

  fetchAllServiceTypes() {
    this.viewTranscriptRequestDetailsService
      .getAllServiceTypes()
      .toPromise()
      .then((result: any) => {
        console.log(result);

        this.serviceTypes = result;
      });
  }

  fetchAllStatusesTypes() {
    this.viewTranscriptRequestDetailsService
      .getAllStatusesTypes()
      .toPromise()
      .then((result: any) => {
        console.log(result);
        this.statuses = result;
      });
  }

  search() {
    this.transcripts = [];
    this.showTable = false;
    this.viewTranscriptRequestDetailsService
      .searchResponseToAPI(this.form)
      .toPromise()
      .then((message: any) => {
        console.log(message)
        this.transcripts = message;
        this.showTable = true;


      });
  }

  VerifyTranscript(id: any, registrationNumber:any, transcriptType:any, serviceType:any) {
    this.generateTranscriptDataTransferService.transcriptId = id;
    this.generateTranscriptDataTransferService.registrationNumber = registrationNumber;
    this.generateTranscriptDataTransferService.transcriptType = transcriptType;
    this.generateTranscriptDataTransferService.serviceType = serviceType;
    this.isDisabled.emit(false);
  }

  onDateChange() {


  }

  programmeChange() {
    this.filteredProgrammes.next(this.programmes);
    this.programmeFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterProgrammes();
      });
    ;
  }

  protected setInitialValue() {
    this.filteredProgrammes
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id;
      });
  }

  filterProgrammes() {
    if (!this.programmes) {
      return;
    }
    // get the search keyword
    let search = this.programmeFilterCtrl.value;
    if (!search) {
      this.filteredProgrammes.next(this.programmes.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredProgrammes.next(
      this.programmes.filter((programme: { name: string; }) => programme.name.toLowerCase().indexOf(search) > -1)
    );
  }

}
