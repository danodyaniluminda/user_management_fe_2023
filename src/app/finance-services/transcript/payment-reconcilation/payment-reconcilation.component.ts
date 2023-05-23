import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import autoTable from "jspdf-autotable";
import jsPDF from 'jspdf';
import { PaymentReconcilationService } from './payment-reconcilation.service';

@Component({
  selector: 'finance-payment-reconcilation',
  templateUrl: './payment-reconcilation.component.html',
  styleUrls: ['./payment-reconcilation.component.css']
})
export class PaymentReconcilationComponent implements OnInit {

  AllVouchers: voucherInterface[] = [];
  AllProgrammes: any = [];
  TranscriptTypes: any = [];
  AllPaymentTypes: any = [];
  vouchers =  new MatTableDataSource(this.AllVouchers);
  vouchersPaymentTypes: any;
  paymentTypes: any = [];
  selectedvoucher: any[] = [];
  isChecked = false;
  isSelectPaymentType:Boolean = true;
  val:Number;

  displayedColumns: string[] = ['applicationId','nic','dateApplied','status','dueAmount','paymentMethod','actions'];

  constructor(
    private paymentReconcilationService: PaymentReconcilationService,
    public datepipe: DatePipe,
    public fb : FormBuilder) {}


  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('htmlData') htmlData!: ElementRef;


  filterDateForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  get fromDate() {
    const fd = this.filterDateForm.get('fromDate');
    if(fd){
      return fd.value;
    }else{
      return null;
    }
   }
  get toDate() {
    const td = this.filterDateForm.get('toDate');
    if(td){
      return td.value;
    }else{
      return null;
    }
  }


  onDateChange(){
    console.log(this.fromDate);
    console.log(this.toDate);
  }

  applyFilter() {
    this.vouchers.filter = ''+Math.random();
    console.log(this.vouchers);
  }

  ngOnInit(): void {
    this.fetchVoucherDetails();
    this.updateVoucher;
  }

  exportTable(){

    let doc = new jsPDF('p', 'pt', 'a4');
    autoTable(doc,
      {
      html: '#printTable',
      columns:[
      {header: 'Application Id', dataKey: 'applicationId'},
      {header: 'NIC', dataKey: 'nic'},
      {header: 'Date Applied', dataKey: 'dateApplied'},
      {header: 'Voucher Status', dataKey: 'status'},
      {header: 'Due Amount', dataKey: 'dueAmount'},
    ],
  });
    doc.text('Payment Reconciliation Report', 40 , 12);
    doc.save('payment_reconcilation_report.pdf' );

  }

  getStatusFilteredVouchers(status: boolean): any {
    let filtered = this.AllVouchers.filter(
      (r: { status: boolean }) => r.status == status
    );
    return filtered;
  }

  voucherD = {
    id: new String(),
    fullName: new String(),
    nic: new String(),
    telNo: new String(),
    email: new String(),
    dateCreated: new Date(),
    initial: new String(),
    title: new String(),
    lastName: new String(),
    applicantType: new String(),
    applicantId: new String(),
    snumber: new String(),
    dateApplied: new Date(),
    referenceNo: new String(),
    programmeNames: new String(),
    digitCode: new String(),
    refNumber: new String(),
    amount: new String(),
    status: new String(),
    archive: new Boolean(),
  };

  private _voucherDetails = {};
  private _selectVoucher = {
    voucherUpdateDetails: {},
  };

  public get selectVoucher() {
    return this._selectVoucher;
  }
  public set selectVoucher(value) {
    this._selectVoucher = value;
  }

  public get voucherDetails() {
    return this._voucherDetails;
  }
  public set voucherDetails(value) {
    this._voucherDetails = value;
  }

  id!: String;
  full_name!: String;
  nic!: String;
  telNo!: String;
  email!: String;
  dateCreated!: Date;
  initial!: String;
  title!: String;
  lastName!: String;
  applicantType!: String;
  applicantId!: String;
  snumber!: String;
  dateApplied!: Date;
  referenceNo!: String;
  programmeNames!: String;
  digitCode!: String;
  refNumber!: String;
  amount!: String;
  status!: String;
  archive: Boolean = true;



  fetchVoucherDetails() {
    this.paymentReconcilationService
      .getVoucherDetails()
      .toPromise()
      .then((result: any) => {
        console.log("All",result);
        this.AllVouchers = this.builddata(result.vouchers);
        this.vouchers = new MatTableDataSource(this.AllVouchers);
        this.vouchers.paginator = this.paginator;
        this.vouchers.filterPredicate = (data, filter) => {
          if (this.fromDate && this.toDate) {
            let dateApplied= this.datepipe.transform(data.dateApplied,'yyyy-MM-dd');
            let fromDate =this.datepipe.transform(this.fromDate,'yyyy-MM-dd')
            let toDate = this.datepipe.transform(this.toDate,'yyyy-MM-dd')
            // console.log("dateApplied ",dateApplied);
            // console.log("fromDate ",fromDate);
            // console.log(data.dateApplied.toString());
            // console.log(this.toDate.toString());
            // return data.dateApplied >= this.fromDate && data.dateApplied <= this.toDate;
            return dateApplied! >= fromDate! && dateApplied! <= toDate!;
          }
          return true;
        };
        // console.log(this.AllVouchers[0].dateApplied)
        this.vouchersPaymentTypes = Array(this.AllVouchers.length).fill('0');
      });
  }

  updateVoucher(applicationId: any,paymentTypeId:any) {
    console.log("Application Id : " + applicationId);
    console.log("Payment Type Id : " + paymentTypeId);
    let selectedvoucher = {"application_id":Number(applicationId),"payment_type":Number(paymentTypeId)};
    // console.log('voucher updated ', selectedvoucher);
    this.paymentReconcilationService
      .updateVoucherByAdmin(selectedvoucher)
      .toPromise()
      .then((result: any) => {});

  }

  onPaymentTypeChange(index: number, value: any, event: Number) {
    console.log("event",event);
    this.val=event;
    this.isSelectPaymentType = false;
    this.vouchersPaymentTypes[index] = value;
    console.log(this.vouchersPaymentTypes);
  }

  builddata(source:any):voucherInterface[]{
    console.log("Type of all " , typeof source);
    let data:voucherInterface[] = [];
    for(let s of source){
      if(!s.status){
        let v = {} as voucherInterface;
        v.applicationId = s.applicationId;
        v.dateApplied =  new Date(s.dateApplied);
        v.dueAmount = s.dueAmount;
        v.nic = s.nic;
        v.programmes = s.programmes;
        v.status = s.status;
        v.transcript_types = s.transcript_types;
        console.log("V",v);
        data.push(v);
      }
    }
    return data;
  }

}

export interface voucherInterface {
  dueAmount: number;
  programmes: object;
  transcript_types : object;
  nic: string;
  applicationId: number;
  dateApplied: Date;
  status: boolean;
}


