import {Component, OnInit, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {TranscriptTypeAndResultTypeService} from "./transcript-type-and-result-type.service";

@Component({
  selector: 'exam-transcript-type-and-result-type',
  templateUrl: './transcript-type-and-result-type.component.html',
  styleUrls: ['./transcript-type-and-result-type.component.css']
})
export class TranscriptTypeAndResultTypeComponent implements OnInit {

  selectedResultTypeId: number;
  selectedTranscriptTypeId: number;


  transcript: any = [];
  transcripts: [] = [];
  transcriptEligibilityTypes: any;

  allTranscriptTypes: any = [];
  allResultTypes: any = [];
  filteredTranscriptTypes: any = [];
  filteredResultTypes: any = [];
  eligibilityTranscriptTypes: any;




  transcriptInput!: String;
  resultInput!: String;

  showTranscriptEligibilityTable: boolean = false;
  allTranscriptEligibility: any = [];
  eligibilityDT = new MatTableDataSource(this.allTranscriptEligibility);
  displayedColumns = ['id', 'resultTypeName', 'tranTypeName']
  @ViewChild('paginator') paginator!: MatPaginator;


  ngAfterViewInit(): void {
    this.eligibilityDT.paginator = this.paginator;
  }

  constructor(
    private transcriptTypeAndResultTypeService: TranscriptTypeAndResultTypeService,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.fetchTranscriptEligibilityDetails();
    this.fetchTranscriptTypeDetails();
    this.fetchResultTypeDetails();
  }

  fetchTranscriptEligibilityDetails() {
    this.transcriptTypeAndResultTypeService
      .getTranscriptEligibility()
      .toPromise()
      .then((result: any) => {
        this.allTranscriptEligibility = result;
        this.eligibilityDT = new MatTableDataSource(this.allTranscriptEligibility);
        this.eligibilityDT.paginator = this.paginator;
        console.log("test", result);
        this.showTranscriptEligibilityTable = true;
      });
  }

  fetchTranscriptTypeDetails() {
    this.transcriptTypeAndResultTypeService
      .getTranscriptType()
      .toPromise()
      .then((result: any) => {
        console.log("fetchTranscriptTypeDetails", result);
        this.allTranscriptTypes = result;
      });
  }

  fetchResultTypeDetails() {
    this.transcriptTypeAndResultTypeService
      .getResultType()
      .toPromise()
      .then((result: any) => {
        console.log("fetchResultTypeDetails", result);
        this.allResultTypes = result;
      });
  }

  getTranscriptType(value: any) {
    //let id = Number(value.split("-")[0].trim());
    //let name = value.split("-")[1].trim();
    //console.log("id - ",id);
    //console.log("name - ",name);
    let transcriptType = this.filteredTranscriptTypes.filter((tt: { name: string }) => tt.name.toLowerCase() == value.toLowerCase())[0];
    this.selectedTranscriptTypeId = transcriptType.id;
    let transcriptTypeName = transcriptType.name;
    console.log("transcriptTypeId - ", this.selectedTranscriptTypeId);
    console.log("transcriptTypeName - ", transcriptTypeName);


  }

  getResultType(value: any) {
    //let id = Number(value.split("-")[0].trim());
    //let name = value.split("-")[1].trim();
    //console.log("id - ",id);
    //console.log("name - ",name);
    let resultType = this.filteredResultTypes.filter((rt: { name: string }) => rt.name.toLowerCase() == value.toLowerCase())[0];
    this.selectedResultTypeId = resultType.id;
    let resultTypeName = resultType.name;
    console.log("resultTypeId - ", this.selectedResultTypeId);
    console.log("resultTypeName - ", resultTypeName);


  }

  genTranscriptTypeValue(filteredTranscriptType: any) {
    return filteredTranscriptType.name

  }

  genResultTypeValue(filteredResultType: any) {
    return filteredResultType.name

  }

  filterTranscriptType() {
    this.filteredTranscriptTypes = this.allTranscriptTypes.filter((tt: { name: string }) => tt.name.toLowerCase().includes(this.transcriptInput.toLowerCase()));
    console.log(this.filteredTranscriptTypes.map((ftt: { name: any; }) => ftt.name))
  }

  filterResultType() {
    this.filteredResultTypes = this.allResultTypes.filter((rt: { name: string }) => rt.name.toLowerCase().includes(this.resultInput.toLowerCase()));
    console.log(this.filteredResultTypes.map((frt: { name: any; }) => frt.name))
  }

  onTranscriptTypeChange(value: any) {
    alert();
    // this.eligibilityTranscriptTypes[index] = value;
    console.log("TEST R", this.transcriptInput);

  }

  onClear() {
    this.transcriptInput = "";
    this.resultInput = "";
  }

  saveTranscriptEligibility() {
    console.log("Save");
    console.log("transcriptTypeId - ", this.selectedTranscriptTypeId);
    console.log("resultTypeId - ", this.selectedResultTypeId);
    if(this.resultInput == undefined || this.resultInput.trim().length==0){
      this.selectedResultTypeId=-1;
      Swal.fire('Error', 'Please fill the required field!', 'error');
      return;
    }
    if(this.transcriptInput == undefined || this.transcriptInput.trim().length==0){
      this.selectedTranscriptTypeId=-1;
      Swal.fire('Error', 'Please fill the required field!', 'error');
      return;
    }
    if(this.selectedTranscriptTypeId==undefined || this.selectedResultTypeId==undefined || this.selectedResultTypeId==-1 || this.selectedTranscriptTypeId==-1){
      Swal.fire('Error', 'Please fill the required field!', 'error');
      return;
    }
    let filteredTranscriptEligibility = this.allTranscriptEligibility.filter((te: {tranType:{id:any}, resultType: {id:any}}) => te.tranType.id == this.selectedTranscriptTypeId && te.resultType.id == this.selectedResultTypeId);
    if(filteredTranscriptEligibility.length){
      Swal.fire('Already exists', 'Already exists!, Please enter the new record', 'error');
      return;
    }
    this.transcriptTypeAndResultTypeService
      .saveTranscriptEligibility(this.selectedTranscriptTypeId, this.selectedResultTypeId)
      .toPromise()
      .then(
        (result: any) => {
          console.log(result);
          this.fetchTranscriptEligibilityDetails();
          this.transcriptInput = "";
          this.resultInput = "";
          Swal.fire('Thank you...', 'You submitted successfully!', 'success');
        }
      )
      .catch(
        (error: any) => {
          {
            console.log(error);
          }
        }
      );

  }


  goToAddNewTranscriptType(){
    this.router.navigate(['/exam/master-data/transcript-type'])
  }

  goToAddNewResultType(){
    this.router.navigate(['/exam/master-data/result-type'])
  }

}

