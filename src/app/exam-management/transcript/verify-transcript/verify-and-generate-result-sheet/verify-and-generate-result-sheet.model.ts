import {Injectable} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginatorModule, MatPaginatorIntl, MatPaginator} from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class VerifyAndGenerateResultSheetModel {
  private _serviceType: any;
  get serviceType(): any {
    return this._serviceType;
  }

  set serviceType(value: any) {
    this._serviceType = value;
  }

  private _transcriptType: any;
  get transcriptType(): any {
    return this._transcriptType;
  }

  set transcriptType(value: any) {
    this._transcriptType = value;
  }

  private _resultVerified: boolean = false;


  public get resultVerified(): boolean {
    return this._resultVerified;
  }

  public set resultVerified(value: boolean) {
    this._resultVerified = value;
  }

  private _transcriptId: number;

  public get transcriptId(): number {
    return this._transcriptId;
  }

  public set transcriptId(value: number) {
    this._transcriptId = value;
  }

  private _registrationNumber: number;

  public get registrationNumber(): number {
    return this._registrationNumber;
  }

  public set registrationNumber(value: number) {
    this._registrationNumber = value;
  }

  private _transcript: any;

  public get transcript(): any {
    return this._transcript;
  }

  public set transcript(value: any) {
    this._transcript = value;
  }


  private _verificationOrResultsToBeCorrectedValue: number = 1;
  public get verificationOrResultsToBeCorrectedValue(): number {
    return this._verificationOrResultsToBeCorrectedValue;
  }

  public set verificationOrResultsToBeCorrectedValue(value: number) {
    this._verificationOrResultsToBeCorrectedValue = value;
  }


  private _showDetails: boolean = false;
  public get showDetails(): boolean {
    return this._showDetails;
  }

  public set showDetails(value: boolean) {
    this._showDetails = value;
  }

  private _personalDetails: any;
  public get personalDetails(): any {
    return this._personalDetails;
  }

  public set personalDetails(value: any) {
    this._personalDetails = value;
  }

  private _academicPerformanceDetails: any;
  public get academicPerformanceDetails(): any {
    return this._academicPerformanceDetails;
  }

  public set academicPerformanceDetails(value: any) {
    this._academicPerformanceDetails = value;
  }

  private _courseDetails: any = [];
  public get courseDetails(): any {
    return this._courseDetails;
  }

  public set courseDetails(value: any) {
    this._courseDetails = value;
  }

  private _courseDetailsTDS: MatTableDataSource<any> = new MatTableDataSource();

  public get courseDetailsTDS() {
    return this._courseDetailsTDS;
  }

  public set courseDetailsTDS(value) {
    this._courseDetailsTDS = value;
  }


  public buildCourseDetails() {
    for (let academicPerformanceDetail of this._academicPerformanceDetails) {
      this._courseDetails.push(...academicPerformanceDetail.courseDetails);
    }
  }


  displayedColumns = ["courseLevel", "courseCode", "courseTitle", "courseCredit", "gradeDescription", "gradeGpValue", "programmeStatusText", "progressLogAcademicYear"]

}
