import { HttpClient } from '@angular/common/http';
import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { PrintTranscriptService } from './print-transcript.service';
import { After_senate_approvalService } from '../transcript-formats/after_senate_approval.service';
import { Before_senate_approvalService } from '../transcript-formats/before_senate_approval.service';
import { Interim_result_sheetService } from '../transcript-formats/interim_result_sheet.service';

@Component({
  selector: 'exam-view-print-transcript-details',
  templateUrl: './view-print-transcript-details.component.html',
  styleUrls: ['./view-print-transcript-details.component.css']
})
export class ViewPrintTranscriptDetailsComponent implements OnInit {

  @ViewChild('rowExpansion', { static: true }) rowExpansion: TemplateRef<any>;
  options = {}
  // data:any = [];
  allData:any = [];
  showEditArray:boolean[] = [];
  columns = [
    { key: 'programmeName', title: 'Programme Name', width: 30},
    { key: 'serviceType', title: 'Service Type', width: 30},
    { key: 'transcriptType', title: 'Transcript Type', width: 30},
    { key: 'dateApplied', title: 'Date Applied', width: 30},
    { key: 'regNo', title: 'Reg No', width: 30},
    { key: 'nic', title: 'NIC/Passport', width: 30}
  ];

  transcriptFunction:String;
  gpaTableValue:any;
  gvlue:any;
  dtOptions: DataTables.Settings = {};
  showTable: Boolean = false;
  isChecked = false;
  transcripts: any[];
  value = '';
  data:any;
  form = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
    nic: new FormControl(),
    programme: new FormControl(),
    status: new FormControl(3),
    transcriptType: new FormControl(),
    service: new FormControl(),
  });

  public filteredProgrammes: ReplaySubject<any> = new ReplaySubject<any>(1);
  public programmeFilterCtrl: FormControl = new FormControl('');
  @ViewChild('singleSelect', {static: true}) singleSelect: MatSelect;
  protected _onDestroy = new Subject<void>();

  programmes: any;
  transcriptTypes: any;
  serviceTypes: any;

  constructor(
    private printTranscriptService: PrintTranscriptService,
    private _httpClient: HttpClient,
    // private commonData:PrintCommonService,
    // private printer2Service:Printer2Service,
    private interimResultSheetService:Interim_result_sheetService,
    private afterSenateApprovalService:After_senate_approvalService,
    private beforeSenateApprovalService:Before_senate_approvalService
  ) {}
  ngOnInit(): void {
    this.fetchAllProgrammes();
    this.fetchAllTranscriptTypes();
    this.fetchAllServiceTypes();
    // this.search();

    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: false,
      paging: true,
    };
    this.programmeChange();

    //Set table options
    this.options = {
      //delete check box true if you dont want checkbox
      //checkboxes: true,
      rowDetailTemplate:this.rowExpansion
    }

    // //Get data from backend
    // setTimeout(() => {
    //
    //   //Get data from backend
    //   // this.data = this.search();
    //
    //   //Create boolean array
    //   this.showEditArray = Array.from({ length: this.data.length }, (value, index) => false);
    //
    // }, 3000);

  }



  ngAfterViewInit() {
    this.programmeChange();
    }

  get fromDate() {
    const fd = this.form.get('fromDate');
    if (fd) {
      return fd.value;
    }
    // else {
    //   return null;
    // }
  }

  get toDate() {
    const td = this.form.get('toDate');
    if (td) {
      return td.value;
    }
    // else {
    //   return null;
    // }
  }

  onDateChange() {
    //console.log(this.fromDate);
    //console.log(this.toDate);
  }

  fetchAllProgrammes() {
    this.printTranscriptService
      .getAllProgrammes()
      .toPromise()
      .then((result: any) => {
       // console.log(result);
        this.programmes = result;
        this.filteredProgrammes.next(this.programmes);
      });
  }

  fetchAllTranscriptTypes() {
    this.printTranscriptService
      .getAllTranscriptTypes()
      .toPromise()
      .then((result: any) => {
       // console.log(result);
        this.transcriptTypes = result;
      });
  }

  fetchAllServiceTypes() {
    this.printTranscriptService
      .getAllServiceTypes()
      .toPromise()
      .then((result: any) => {
       // console.log(result);
        this.serviceTypes = result;
      });
  }
//   getTranscriptFunction(programmeId:any,transcriptTypeId:any):string {
//    return this.printTranscriptService
//     .getTranscriptFunctionForPrint(programmeId,transcriptTypeId)
//     .toPromise()
//     .then((result: any) => {
//      // this.printer2Service.generateWordDoc(result);
//      this.transcriptFunction = result; // Assign the retrieved string value to a variable
//             console.log('Transcript:', this.transcriptFunction);
//     });


//  }
getTranscriptFunction(programmeId: any, transcriptTypeId: any): Promise<String> {
  return this.printTranscriptService
    .getTranscriptFunctionForPrint(programmeId, transcriptTypeId)
    .toPromise()
    .then((result: any) => {
      this.transcriptFunction = result; // Assign the retrieved string value to a variable
      console.log('Transcript:', this.transcriptFunction);
      return this.transcriptFunction; // Return the retrieved string value
    });
}

getgpaTable(id: any): Promise<any> {
  return this.printTranscriptService
    .getgpaTable(id)
    .toPromise()
    .then((result: any) => {
      this.gpaTableValue = result; // Assign the retrieved string value to a variable
      console.log('gpa Table get value:', this.gpaTableValue);
      return this.gpaTableValue; // Return the retrieved string value
    });
}


async fetchTranscriptDetails(applicantId:any,resultType:any,applicantRegistrationNumber:any,transcript_type_id:any,programme_id:any,transcriptId:any): Promise<void> {
  // Call the getTranscriptFunction() function and store the returned string value in a variable
 // alert(programme_id);
  //alert(transcriptId);
  try {
    this.printTranscriptService
    .getTranscriptDetails(applicantRegistrationNumber,false)
    .toPromise()
    .then(async (result: any) => {
    this.getTranscriptFunction(programme_id,transcript_type_id);
   // this.saveGpa();
    this.gvlue = await this.getgpaTable(5);
    console.log("function inside v",this.gvlue);
    const transcriptValue: String = await this.getTranscriptFunction(programme_id, transcript_type_id);
    switch (transcriptValue) {
      case 'interimResultSheetService':
        this.interimResultSheetService.generateWordDoc(result,applicantId,resultType,this.gvlue);
        break;
      case 'afterSenateApproval':
        this.afterSenateApprovalService.generateWordDoc(result,applicantId,resultType,this.gvlue);
        break;
      case 'beforeSenateApproval':
        this.beforeSenateApprovalService.generateWordDoc(result,applicantId,resultType);
        break;
      default:
        console.log('Default Case');
        break;
    }
    result['transcriptDetails'] = {
      "transcriptId": transcriptId
    };
    const randomKey = this.generateRandomKey();
    result['randomKeyDetails'] = {
      "randomKey": randomKey
    };
    console.log('resulty of transcript:', result);
      this.saveTranscriptData(result);
      this.search();
    });
    // You can now use the 'transcriptValue' variable to access the retrieved string value
  } catch (error) {
    console.error('Error retrieving transcript:', error);
  }
}

generateRandomKey(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    key += characters.charAt(randomIndex);
  }

  return key;
}


saveGpa(){
  const gpaDetails1 = `new docx.Table({
    width: {
      size: 100,
      type: docx.WidthType.PERCENTAGE,
    },
    rows: [
      new docx.TableRow({

        children: [
          new docx.TableCell({
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 700,
              type: WidthType.DXA,
          },
            children: [new docx.Paragraph('Grade/Status')]
          }),

          new TableCell({
                children: [new Paragraph("A+"),],
                 }),
                 new TableCell({
                  children: [new Paragraph("A"),],
                   }),
                   new TableCell({
                    children: [new Paragraph("A-"),],
                     }),
                     new TableCell({
                      children: [new Paragraph("B+"),],
                       }),
                       new TableCell({
                        children: [new Paragraph("B"),],
                         }),
                         new TableCell({
                          children: [new Paragraph("B-"),],
                           }),
                             new TableCell({
                              children: [new Paragraph("C+"),],
                               }),
                               new TableCell({
                                children: [new Paragraph("C"),],
                                 }),
                                 new TableCell({
                                  children: [new Paragraph("C-"),],
                                   }),
                                   new TableCell({
                                    children: [new Paragraph("D+"),],
                                     }),
                                     new TableCell({
                                      children: [new Paragraph("D"),],
                                       }),
                                       new TableCell({
                                        children: [new Paragraph("E"),],
                                         }),
                                         new TableCell({
                                          children: [new Paragraph("EX"),],
                                           }),

        ]
      }),

      new docx.TableRow({

        children: [
          new docx.TableCell({
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 700,
              type: WidthType.DXA,
          },
            children: [new docx.Paragraph('Marks')]
          }),

          new TableCell({
            children: [new Paragraph("4.00"),],
             }),
             new TableCell({
              children: [new Paragraph("4.00"),],
               }),
               new TableCell({
                children: [new Paragraph("3.70"),],
                 }),
                 new TableCell({
                  children: [new Paragraph("3.30"),],
                   }),
                   new TableCell({
                    children: [new Paragraph("3.00"),],
                     }),
                     new TableCell({
                      children: [new Paragraph("2.70"),],
                       }),
                       new TableCell({
                        children: [new Paragraph("2.30"),],
                         }),
                         new TableCell({
                          children: [new Paragraph("2.00"),],
                           }),
                           new TableCell({
                            children: [new Paragraph("1.70"),],
                             }),
                             new TableCell({
                              children: [new Paragraph("1.30"),],
                               }),
                               new TableCell({
                                children: [new Paragraph("1.00"),],
                                 }),
                                 new TableCell({
                                  children: [new Paragraph("0.00"),],
                                   }),
                                   new TableCell({
                                    children: [new Paragraph("0.00"),],
                                     }),
        ]
      }),
      new docx.TableRow({

        children: [
          new docx.TableCell({
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 700,
              type: WidthType.DXA,
          },
            children: [new docx.Paragraph('Marks')]
          }),

          new TableCell({
            children: [new Paragraph(">80"),],
             }),
             new TableCell({
              children: [new Paragraph("70-79"),],
               }),
               new TableCell({
                children: [new Paragraph("65-69"),],
                 }),
                 new TableCell({
                  children: [new Paragraph("60-64"),],
                   }),
                   new TableCell({
                    children: [new Paragraph("55-59"),],
                     }),
                     new TableCell({
                      children: [new Paragraph("50-54"),],
                       }),
                       new TableCell({
                        children: [new Paragraph("45-49"),],
                         }),
                         new TableCell({
                          children: [new Paragraph("40-44"),],
                           }),
                           new TableCell({
                            children: [new Paragraph("35-39"),],
                             }),
                             new TableCell({
                              children: [new Paragraph("30-34"),],
                               }),
                               new TableCell({
                                children: [new Paragraph("20-29"),],
                                 }),
                                 new TableCell({
                                  children: [new Paragraph("0-19"),],
                                   }),
                                   new TableCell({
                                    children: [new Paragraph(""),],
                                     }),

        ]
      }),
    ]
    })`;
  this.printTranscriptService
      .saveGPATable(gpaDetails1)
      .toPromise()
      .then((result: any) => {
       // this.printer2Service.generateWordDoc(result);
       console.log("rrrr",result);
      });
}

  saveTranscriptData(data:any) {
    this.printTranscriptService
      .saveTranscriptData(data)
      .toPromise()
      .then((result: any) => {
       // this.printer2Service.generateWordDoc(result);
       console.log("rrrr",result);
      });
  }

  // search() {
  //   this.transcripts = [];
  //   this.showTable=false;
  //   this.printTranscriptService
  //     .searchResponseToAPI(this.form)
  //     .toPromise()
  //     .then((message: any) => {
  //       this.transcripts = message;
  //      // console.log("Test", result);
  //      //  result = result.map((row:any) => ({
  //      //    programmeName: row['programmeName'],
  //      //    serviceType: row['serviceType'],
  //      //    transcriptType: row['transcriptType'],
  //      //    dateApplied: row['dateApplied'],
  //      //    regNo: row['regNo'],
  //      //    nic: row['nic']
  //      //  }));
  //      //  this.transcripts = result;
  //      //  this.data = result;
  //       // console.log("T_types",this.transcripts);
  //       this.showTable = true;
  //     });
  // }

  search() {
    this.transcripts = [];
    this.showTable = false;
    this.printTranscriptService
      .searchResponseToAPI(this.form)
      .toPromise()
      .then((message: any) => {
        console.log(message)
        this.transcripts = message;
        this.showTable = true;


      });
  }
  programmeChange() {
    this.filteredProgrammes.next(this.programmes);
    this.programmeFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterProgrammes();
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
      this.programmes.filter((programme: { name: string, programmeCode: string }) =>
        programme.name.toLowerCase().indexOf(search) > -1 || programme.programmeCode.toLowerCase().indexOf(search) > -1)
    );
  }


}
