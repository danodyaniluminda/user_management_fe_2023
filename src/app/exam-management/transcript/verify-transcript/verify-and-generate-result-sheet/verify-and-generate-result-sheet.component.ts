import { AfterViewInit, Component, OnInit, ViewChild, HostListener, EventEmitter, Output } from '@angular/core';
import { VerifyAndGenerateResultSheetModel } from './verify-and-generate-result-sheet.model';
import { MatTableDataSource } from '@angular/material/table';
import { VerifyAndGenerateResultSheetService } from './verify-and-generate-result-sheet.service';
import { error } from 'console';
import { MatPaginatorModule, MatPaginatorIntl, MatPaginator } from '@angular/material/paginator';
import { GenerateTranscriptDataTransferService } from '../generate-transcript-data-transfer.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";



@Component({
  selector: 'exam-verify-and-generate-result-sheet',
  templateUrl: './verify-and-generate-result-sheet.component.html',
  styleUrls: ['./verify-and-generate-result-sheet.component.css']
})
export class VerifyAndGenerateResultSheetComponent implements OnInit , AfterViewInit {


  verifyAndGenerateResultSheetModel: VerifyAndGenerateResultSheetModel = new VerifyAndGenerateResultSheetModel();

  @Output() changeTab = new EventEmitter<Boolean>();


  constructor(
    private verifyAndGenerateResultSheetService:VerifyAndGenerateResultSheetService,
    private generateTranscriptDataTransferService:GenerateTranscriptDataTransferService,
    private router: Router
    ) { }

    // @HostListener('window:focus') onFocus() {
    //   console.log('window focus');
    //   window.location.reload();
    // }

  ngAfterViewInit(): void {
    this.verifyAndGenerateResultSheetModel.courseDetailsTDS.paginator = this.paginator;
  }


  @ViewChild('paginator') paginator!: MatPaginator;






  ngOnInit(): void {
    this.verifyAndGenerateResultSheetModel.transcriptId = this.generateTranscriptDataTransferService.transcriptId;
    this.verifyAndGenerateResultSheetModel.registrationNumber = this.generateTranscriptDataTransferService.registrationNumber;
    this.verifyAndGenerateResultSheetModel.serviceType = this.generateTranscriptDataTransferService.serviceType;
    this.verifyAndGenerateResultSheetModel.transcriptType = this.generateTranscriptDataTransferService.transcriptType;
    console.log("transcriptId : ",this.verifyAndGenerateResultSheetModel.transcriptId);
    this.verifyAndGenerateResultSheetService.verifyAndGenerateResultSheetModel = this.verifyAndGenerateResultSheetModel;
    this.fetchData();
    console.log("Verify Ng oninit");
    console.log("Verify Ng oninit");
  }

  fetchData(){
    this.verifyAndGenerateResultSheetService.verifyAndGenerateResultSheetModel = this.verifyAndGenerateResultSheetModel;

    this.verifyAndGenerateResultSheetService
    .getCertificateDetailsByApplicantRegistrationNumberAndIsEngineering(this.verifyAndGenerateResultSheetModel.registrationNumber)
    .toPromise()
    .then(
      (result:any) =>{
        //console.log(result);
        this.verifyAndGenerateResultSheetModel.buildCourseDetails();
        console.log("personalDetails : ", this.verifyAndGenerateResultSheetModel.personalDetails);
        console.log("academicPerformanceDetails : ", this.verifyAndGenerateResultSheetModel.academicPerformanceDetails);
        console.log("courseDetails : ", this.verifyAndGenerateResultSheetModel.courseDetails);
        this.verifyAndGenerateResultSheetModel.courseDetailsTDS = new MatTableDataSource(this.verifyAndGenerateResultSheetModel.courseDetails)
        this.verifyAndGenerateResultSheetModel.courseDetailsTDS.paginator = this.paginator;
        this.verifyAndGenerateResultSheetModel.showDetails = true;
      }
    )
    .catch(
      (error:any) => {{
        console.log(error);
      }}
    );


    this.verifyAndGenerateResultSheetService
    .getTranscriptById(this.verifyAndGenerateResultSheetModel.transcriptId)
    .toPromise()
    .then(
      (result:any) =>{
        console.log(result);
        let servedStatus = result.servedStatus.id;
        if(servedStatus==3){
          this.verifyAndGenerateResultSheetModel.resultVerified = true;
        }
        console.log("servedStatus : ",result.servedStatus.id);

      }
    )
    .catch(
      (error:any) => {{
        console.log(error);
      }}
    );


  }

  cancel(){
    this.changeTab.emit(true);
  }

  verifyResults(transcriptResultStatusTypeId:number){
    this.verifyAndGenerateResultSheetService
    .changeTranscriptStatusByTranscriptIdAndServedStatus(this.verifyAndGenerateResultSheetModel.transcriptId,transcriptResultStatusTypeId)
    .toPromise()
    .then(
      (result:any) =>{


        //this.changeTab.emit(true);

        console.log("Verify @ Componenet : ",result);
        Swal.fire({
          title:'Success!',
          html:result['message'],
          icon:'success'
        }).then( () => {
          window.location.reload();
        });

      }


    )
    .catch(
      (error:any) => {{
        console.log(error);
      }}
    );
  }


}
