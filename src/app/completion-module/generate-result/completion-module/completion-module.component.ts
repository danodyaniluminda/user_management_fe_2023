import {Component, OnInit, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {AddNewCompletionService} from "./completion-module.service";
import {Router} from "@angular/router";
import {ReplaySubject, Subject, takeUntil} from "rxjs";
import {FormControl} from "@angular/forms";
import {MatChipsModule} from '@angular/material/chips';
 import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import {tsCastToAny} from "@angular/compiler-cli/src/ngtsc/typecheck/src/ts_util";

@Component({
  selector: 'completion-completion-module',
  templateUrl: './completion-module.component.html',
  styleUrls: ['./completion-module.component.css']
})
export class CompletionModuleComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  showTable: Boolean = false;
  addButtonDisabled: boolean = true;
  showExportButton: boolean = false;
  showContinueCourseErrorMsg: boolean = false;
  showContinueCourseSuccessMsg: boolean = false;
  showExportButtonOpenElectiveCheckLevel3: boolean = false;
  showOpenElectiveCheckLevel3ErrorMsg: boolean = false;
  showOpenElectiveCheckLevel3SuccessMsg: boolean = false;
  showExportButtonOpenElectiveCheckLevel5: boolean = false;
  showOpenElectiveCheckLevel5ErrorMsg: boolean = false;
  showOpenElectiveCheckLevel5SuccessMsg: boolean = false;
  showExportButtonGpaCalculation: boolean = false;
  showGpaCalculationErrorMsg: boolean = false;
  showGpaCalculationSuccessMsg: boolean = false;
  showExportButtonRegularCourseCheck: boolean = false;
  showRegularCourseCheckErrorMsg: boolean = false;
  showRegularCourseCheckSuccessMsg: boolean = false;
  showExportButton4RegularCourseCheck: boolean = false;
  show4RegularCourseCheckErrorMsg: boolean = false;
  show4RegularCourseCheckSuccessMsg: boolean = false;
  showExportButton5RegularCourseCheck: boolean = false;
  show5RegularCourseCheckErrorMsg: boolean = false;
  show5RegularCourseCheckSuccessMsg: boolean = false;
  showExportButtonGrades3Check: boolean = false;
  showGrades3CheckErrorMsg: boolean = false;
  showGrades3CheckSuccessMsg: boolean = false;
  showExportButtonGrades4Check: boolean = false;
  showGrades4CheckErrorMsg: boolean = false;
  showGrades4CheckSuccessMsg: boolean = false;
  showExportButtonGrades5Check: boolean = false;
  showGrades5CheckErrorMsg: boolean = false;
  showGrades5CheckSuccessMsg: boolean = false;
  jsonData :any;
  critieaData: any;
  message:any;
  loading: boolean;

  constructor(
    private addNewCompletionService: AddNewCompletionService,
    private router: Router,
  ) {
  }

  programmeId: number = -1;
  programmes: any[];

  public filteredProgrammes: ReplaySubject<any> = new ReplaySubject<any>(1);
  public programmeFilterCtrl: FormControl = new FormControl('');
  protected _onDestroy = new Subject<void>();

  ngOnInit(): void {
    this.fetchAllProgrammes();


    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: false,
      paging: true,
    };

  }
  runFunction(data: any) {
    if (data.criteria.id === 1) {
      this.runContinueCourseCritriaChecking(data.program.id);
    }else if (data.criteria.id === 2) {
      this.runRegularCourseCheckCritriaChecking(data.program.id);
    }else if (data.criteria.id === 3) {
      this.run4RegularCourseCheckCritriaChecking(data.program.id);
    }else if (data.criteria.id === 4) {
      this.run5RegularCourseCheckCritriaChecking(data.program.id);
    }else if (data.criteria.id === 5) {
      this.runOpenElectiveCheckLevel5CritriaChecking(data.program.id);
    }else if (data.criteria.id === 6) {
      this.runGpaCalculationCritriaChecking(data.program.id);
    }else if (data.criteria.id === 7) {
      this.runGrades3CheckCritriaChecking(data.program.id);
    }else if (data.criteria.id === 8) {
      this.runOpenElectiveCheckLevel3CritriaChecking(data.program.id);
    }else if (data.criteria.id === 9) {
      this.runGrades4CheckCritriaChecking(data.program.id);
    }else if (data.criteria.id === 10) {
      this.runGrades5CheckCritriaChecking(data.program.id);
    } else {
      // Implement other cases as needed
    }
  }
  function1(data: any) {
    // Implement your function 1 logic here, using the row data if necessary
    console.log('Running Function 1 for row with ID:', data.id);
    alert(data.criteria.criteriaName);
  }

  function2(data: any) {
    // Implement your function 2 logic here, using the row data if necessary
    console.log('Running Function 2 for row with ID:', data.id);
    alert(data.criteria.criteriaName);
  }

  function3(data: any) {
    // Implement your function 2 logic here, using the row data if necessary
    console.log('Running Function 2 for row with ID:', data.id);
    alert(data.criteria.criteriaName);
  }


  //CourseCritria
runContinueCourseCritriaChecking(programeid: any) {(
  this.addNewCompletionService
    .runContinueCourseCritiria(programeid))
    .toPromise()
    .then((result: any) => {
      console.log(result);
      if(result.status=='SUCCESS'){
        this.updateFailedOrPassedCritiaStudent(programeid);
      }
      if(result.status=='NOT_MATCH'){
        this.jsonData=result;
        this.showExportButton= true;
        this.showContinueCourseErrorMsg=true;
        this.message=result.message;
      }
    })
}

updateFailedOrPassedCritiaStudent(programeid: any) {(
  this.addNewCompletionService
    .updateFailedOrPassedCritiaStudent(programeid))
    .toPromise()
    .then((result: any) => {
      console.log(result);
      if(result.status=='SUCCESS'){
        this.showContinueCourseSuccessMsg=true;
        this.message=result.message;

      }

    })
}

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData.data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelData, 'Not Converted Course List.xlsx');
  }


  //OpenElectiveCheckLevel3Critria
  runOpenElectiveCheckLevel3CritriaChecking(programeid: any) {(
    this.addNewCompletionService
      .runOpenElectiveCheckLevel3Critiria(programeid))
    .toPromise()
    .then((result: any) => {
      console.log(result);
      if(result.status=='SUCCESS'){
        this.updateFailedOrPassedCritiaOpenElectiveCheckLevel3(programeid);
        this.getCriteriaByProgrameId(programeid);
      }
      if(result.status=='NOT_MATCH'){
        this.jsonData=result;
        this.showExportButtonOpenElectiveCheckLevel3= true;
        this.showOpenElectiveCheckLevel3ErrorMsg=true;
        this.message=result.message;
      }
    })
  }

  updateFailedOrPassedCritiaOpenElectiveCheckLevel3(programeid: any) {(
    this.addNewCompletionService
      .updateFailedOrPassedCritiaOpenElectiveCheckLevel3(programeid))
    .toPromise()
    .then((result: any) => {
      console.log("updateFailedOrPassedCritiaOpenElectiveCheckLevel3",result.message);
      if(result.message=='success'){
        this.showOpenElectiveCheckLevel3SuccessMsg=true;
        this.message=result.message;
        console.log("updateFailedOrPassedCritiaOpenElectiveCheckLevel3",result.message);

      }

    })
  }

  exportToExcelOpenElectiveCheckLevel3(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData.data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelData, 'Not Converted Open Elective Check Level 3 List.xlsx');
  }

  runOpenElectiveCheckLevel5CritriaChecking(programeid: any) {(
    this.addNewCompletionService
      .runOpenElectiveCheckLevel5Critiria(programeid))
    .toPromise()
    .then((result: any) => {
      console.log(result);
      if(result.status=='SUCCESS'){
        this.updateFailedOrPassedCritiaOpenElectiveCheckLevel5(programeid);
        this.getCriteriaByProgrameId(programeid);
      }
      if(result.status=='NOT_MATCH'){
        this.jsonData=result;
        this.showExportButtonOpenElectiveCheckLevel5= true;
        this.showOpenElectiveCheckLevel5ErrorMsg=true;
        this.message=result.message;
      }
    })
  }

  updateFailedOrPassedCritiaOpenElectiveCheckLevel5(programeid: any) {(
    this.addNewCompletionService
      .updateFailedOrPassedCritiaOpenElectiveCheckLevel5(programeid))
    .toPromise()
    .then((result: any) => {
      console.log(result);
      if(result.status=='success'){
        this.showOpenElectiveCheckLevel5SuccessMsg=true;
        this.message=result.message;

      }

    })
  }

  exportToExcelOpenElectiveCheckLevel5(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData.data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelData, 'Not Converted Open Elective Check Level 5 List.xlsx');
  }


  runGpaCalculationCritriaChecking(programeid: any) {(
    this.addNewCompletionService
      .runGpaCalculationCritiria(programeid))
    .toPromise()
    .then((result: any) => {
      console.log("Result GPA",result);
      if(result.status=='Success'){
        this.updateFailedOrPassedCritiaGpaCalculation(programeid);
        this.getCriteriaByProgrameId(programeid);
        this.message=" Total Passed Contradictions : " + result.message + ", " ;
        this.showGpaCalculationSuccessMsg = true;
      }
      if(result.status=='NOT_MATCH'){
        this.jsonData=result;
        this.showExportButtonGpaCalculation= true;
        this.showGpaCalculationErrorMsg=true;
        this.message=result.message;
      }
    })
  }

  updateFailedOrPassedCritiaGpaCalculation(programeid: any) {(
    this.addNewCompletionService
      .updateFailedOrPassedCritiaGpaCalculation(programeid))
    .toPromise()
    .then((result: any) => {
      console.log(result);
      if(result.status=='Success'){
        this.getCriteriaByProgrameId(programeid);
        this.message=" Total  : " + result.message + ", " ;
        this.showGpaCalculationSuccessMsg=true;
        this.message=result.message;

      }

    })
  }

  exportToExcelGpaCalculation(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData.data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelData, 'Not Converted Gpa Calculation List.xlsx');
  }

  runRegularCourseCheckCritriaChecking(programeid: any) {(
    this.addNewCompletionService
      .runRegularS1CourseCheckCritiria(programeid))
    .toPromise()
    .then((result: any) => {
      console.log(result);
      if(result.status==true){
        this.updateFailedOrPassedCritiaRegularCourseCheck(programeid);
        this.getCriteriaByProgrameId(programeid);
        this.message= result.message;
        this.showRegularCourseCheckSuccessMsg = true;
      }
      if(result.conflict==true){
        //const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData.data);
        this.jsonData=result.conflictExcel;
        this.message=result.message;
        this.showExportButtonRegularCourseCheck= true;
        this.showRegularCourseCheckErrorMsg=true;
      }else{
        this.message=result.message;
        this.showRegularCourseCheckSuccessMsg=true;
      }
    })
  }

  updateFailedOrPassedCritiaRegularCourseCheck(programeid: any) {
    // (
    // this.addNewCompletionService
    //   .updateFailedOrPassedCritiaRegularCourseCheck(programeid))
    // .toPromise()
    // .then((result: any) => {
    //   console.log(result);
    //   if(result.status=='SUCCESS'){
    //     this.showRegularCourseCheckSuccessMsg=true;
    //     this.message=result.message;
    //
    //   }
    //
    // })
  }

  exportToExcelRegularCourseCheck(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelData, 'Regular Course Check List.xlsx');
  }


  run4RegularCourseCheckCritriaChecking(programeid: any) {(
    this.addNewCompletionService
      .run4RegularS1CourseCheckCritiria(programeid))
    .toPromise()
    .then((result: any) => {
      console.log(result);
      if(result.status==true){
        this.updateFailedOrPassedCritia4RegularCourseCheck(programeid);
        this.getCriteriaByProgrameId(programeid);
        this.message= result.message;
        this.show4RegularCourseCheckSuccessMsg = true;
      }
      if(result.conflict==true){
        //const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData.data);
        this.jsonData=result.conflictExcel;
        this.message=result.message;
        this.showExportButton4RegularCourseCheck= true;
        this.show4RegularCourseCheckErrorMsg=true;
      }else{
        this.message=result.message;
        this.show4RegularCourseCheckSuccessMsg=true;
      }
    })
  }

  updateFailedOrPassedCritia4RegularCourseCheck(programeid: any) {
    // (
    // this.addNewCompletionService
    //   .updateFailedOrPassedCritiaRegularCourseCheck(programeid))
    // .toPromise()
    // .then((result: any) => {
    //   console.log(result);
    //   if(result.status=='SUCCESS'){
    //     this.showRegularCourseCheckSuccessMsg=true;
    //     this.message=result.message;
    //
    //   }
    //
    // })
  }

  exportToExcel4RegularCourseCheck(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelData, 'Regular Course Check List.xlsx');
  }

  run5RegularCourseCheckCritriaChecking(programeid: any) {(
    this.addNewCompletionService
      .run5RegularS1CourseCheckCritiria(programeid))
    .toPromise()
    .then((result: any) => {
      console.log(result);
      if(result.status==true){
        this.updateFailedOrPassedCritia5RegularCourseCheck(programeid);
        this.getCriteriaByProgrameId(programeid);
        this.message= result.message;
        this.show5RegularCourseCheckSuccessMsg = true;
      }
      if(result.conflict==true){
        //const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData.data);
        this.jsonData=result.conflictExcel;
        this.message=result.message;
        this.showExportButton5RegularCourseCheck= true;
        this.show5RegularCourseCheckErrorMsg=true;
      }else{
        this.message=result.message;
        this.show5RegularCourseCheckSuccessMsg=true;
      }
    })
  }

  updateFailedOrPassedCritia5RegularCourseCheck(programeid: any) {
    // (
    // this.addNewCompletionService
    //   .updateFailedOrPassedCritiaRegularCourseCheck(programeid))
    // .toPromise()
    // .then((result: any) => {
    //   console.log(result);
    //   if(result.status=='SUCCESS'){
    //     this.showRegularCourseCheckSuccessMsg=true;
    //     this.message=result.message;
    //
    //   }
    //
    // })
  }

  exportToExcel5RegularCourseCheck(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelData, 'Regular Course Check List.xlsx');
  }

  runGrades3CheckCritriaChecking(programeid: any) {(
    this.addNewCompletionService
      .runGrades3CheckCritiria(programeid))
    .toPromise()
    .then((result: any) => {
      console.log(result);
      if(result.status==true){
        this.updateFailedOrPassedCritiaGrades3Check(programeid);
        this.getCriteriaByProgrameId(programeid);
        this.message= result.message;
        this.showGrades3CheckSuccessMsg = true;
      }
      if(result.conflict==true){
        //const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData.data);
        this.jsonData=result.conflictExcel;
        this.message=result.message;
        this.showExportButtonGrades3Check= true;
        this.showGrades3CheckErrorMsg=true;
      }else{
        this.message=result.message;
        this.showGrades3CheckSuccessMsg=true;
      }
    })
  }

  updateFailedOrPassedCritiaGrades3Check(programeid: any) {
    // (
    // this.addNewCompletionService
    //   .updateFailedOrPassedCritiaRegularCourseCheck(programeid))
    // .toPromise()
    // .then((result: any) => {
    //   console.log(result);
    //   if(result.status=='SUCCESS'){
    //     this.showRegularCourseCheckSuccessMsg=true;
    //     this.message=result.message;
    //
    //   }
    //
    // })
  }

  exportToExcelGrades3Check(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelData, 'Grades 3 Check List.xlsx');
  }

  runGrades4CheckCritriaChecking(programeid: any) {(
    this.addNewCompletionService
      .runGrades4CheckCritiria(programeid))
    .toPromise()
    .then((result: any) => {
      console.log(result);
      if(result.status==true){
        this.updateFailedOrPassedCritiaGrades4Check(programeid);
        this.getCriteriaByProgrameId(programeid);
        this.message= result.message;
        this.showGrades4CheckSuccessMsg = true;
      }
      if(result.conflict==true){
        //const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData.data);
        this.jsonData=result.conflictExcel;
        this.message=result.message;
        this.showExportButtonGrades4Check= true;
        this.showGrades4CheckErrorMsg=true;
      }else{
        this.message=result.message;
        this.showGrades4CheckSuccessMsg=true;
      }
    })
  }

  updateFailedOrPassedCritiaGrades4Check(programeid: any) {
    // (
    // this.addNewCompletionService
    //   .updateFailedOrPassedCritiaRegularCourseCheck(programeid))
    // .toPromise()
    // .then((result: any) => {
    //   console.log(result);
    //   if(result.status=='SUCCESS'){
    //     this.showRegularCourseCheckSuccessMsg=true;
    //     this.message=result.message;
    //
    //   }
    //
    // })
  }

  exportToExcelGrades4Check(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelData, 'Grades 4 Check List.xlsx');
  }


  runGrades5CheckCritriaChecking(programeid: any) {(
    this.addNewCompletionService
      .runGrades5CheckCritiria(programeid))
    .toPromise()
    .then((result: any) => {
      console.log(result);
      if(result.status==true){
        this.updateFailedOrPassedCritiaGrades5Check(programeid);
        this.getCriteriaByProgrameId(programeid);
        this.message= result.message;
        this.showGrades5CheckSuccessMsg = true;
      }
      if(result.conflict==true){
        //const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData.data);
        this.jsonData=result.conflictExcel;
        this.message=result.message;
        this.showExportButtonGrades5Check= true;
        this.showGrades5CheckErrorMsg=true;
      }else{
        this.message=result.message;
        this.showGrades5CheckSuccessMsg=true;
      }
    })
  }

  updateFailedOrPassedCritiaGrades5Check(programeid: any) {
    // (
    // this.addNewCompletionService
    //   .updateFailedOrPassedCritiaRegularCourseCheck(programeid))
    // .toPromise()
    // .then((result: any) => {
    //   console.log(result);
    //   if(result.status=='SUCCESS'){
    //     this.showRegularCourseCheckSuccessMsg=true;
    //     this.message=result.message;
    //
    //   }
    //
    // })
  }

  exportToExcelGrades5Check(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelData, 'Grades 5 Check List.xlsx');
  }




  fetchAllProgrammes() {
    this.addNewCompletionService
      .getAllProgrammes()
      .toPromise()
      .then((result: any) => {
        this.filteredProgrammes.next(this.programmes);
        console.log("All-programmes", result);
        this.programmes = result;
        //this.programmeId = this.programmes[0].id;
      })
      .catch((exception: any) => {
        alert(exception);
      });
  }

  async getCriteriaByProgrameId(programeid: any) {
    this.loading = false;
    this.critieaData=[];
    (await this.addNewCompletionService
      .getCriteriaByProgrameId(programeid))
      .toPromise()
      .then((data: any) => {
        console.log(data)
        this.critieaData = data;
        this.loading = true;
        this.showTable = true;
// console.log("this.loading",this.loading)
//         this.oneDayDates = this.model.oneDayDates;
      })
  }


  programmeChange(target: any) {
    this.programmeId = target.value;
    console
      .log(this

        .programmes
      );

    this
      .filteredProgrammes
      .next(this

        .programmes
      );
    this
      .programmeFilterCtrl
      .valueChanges
      .pipe(takeUntil

      (
        this
          ._onDestroy
      ))
      .subscribe(
        () => {
          this
            .filterProgrammes();
        }
      )
    ;
  }

  filterProgrammes() {
    if (!this.programmes) {
      return;
    }
    let search = this.programmeFilterCtrl.value;
    if (!search) {
      this.filteredProgrammes.next(this.programmes.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredProgrammes.next(
      this.programmes.filter((programme: {
        programName: string;
      }) => programme.programName.toLowerCase().indexOf(search) > -1)
    );
  }


  addNewProgram() {

  }


  run(id
        :
        number
  ) {

  }

  camelCaseText(word
                  :
                  string
  ):
    string {
    const words = word.split(' ');

    const camelCaseWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    return camelCaseWords.join(' ');
  }


}

