import {Component, OnInit, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {AddNewResultStatusService} from "./add-new-result-status.service";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'exam-result-type',
  templateUrl: './result-type.component.html',
  styleUrls: ['./result-type.component.css']
})
export class ResultTypeComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  resultStatuses: any[] = [];
  // resultsStatusDT = new MatTableDataSource(this.resultStatuses);
  resultStatus: any[];


  resultStatusName:string;
  resultStatusNo:string;
  showTable: Boolean = false;
  addButtonDisabled :boolean=true;

  // transcripts: any[];

  constructor(
    private addNewResultStatusService:AddNewResultStatusService,
    private router:Router
  ) { }



  // displayedColumns = ['id', 'old_omis_id', 'result_type', 'delete']

  // @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.resultStatuses=[];
    this.fetchAllResultStatuss();
    this.search();

    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: false,
      paging: true,
    };

  }

  fetchAllResultStatuss(){
    this.addNewResultStatusService.getAllResultStatus()
      .toPromise()
      .then((result:any) => {
        this.resultStatuses = result;
        // this.resultsStatusDT = new MatTableDataSource(this.resultStatuses);
        // this.resultsStatusDT.paginator = this.paginator;
        // console.log(this.resultStatuss);
      })
      .catch((exception:any) => {
        alert(exception);
      });
  }

  filterResultStatus($event:any){
    this.addButtonDisabled = false;
    let key = $event.target.value;
    let filtered = this.resultStatuses.filter(status => status.name.includes(key));
    console.log(filtered);

  }
  onResultTypeClick(){
    this.addButtonDisabled = false;
  }
  addNewResultStatus(){

    if(this.resultStatusName==undefined || this.resultStatusName.trim().length==0){
      Swal.fire('Please enter the result type', 'Result type is empty!', 'error');

      return;
    }
    this.resultStatusName = this.camelCaseText(this.resultStatusName.trim());

    let filteredresultStatuss = this.resultStatuses.filter((tt: {name:any, type: any}) => tt.name == this.resultStatusName.trim());
    if(filteredresultStatuss.length>0){
      Swal.fire('Oops!', 'Entered details are already exists! ', 'error');

      return;
    }

    console.log("AddNewResultStatus -> " , this.resultStatusName + " & " + this.resultStatusNo);

    {
      this.addNewResultStatusService.addNewResultStatus(this.resultStatusName,this.resultStatusNo)
        .toPromise()
        .then((result:any) => {
          console.log(result);
        })
        .catch((exception:any) => {
          alert(exception);
        });
    }
  }

  search() {
    this.showTable=false;
    this.addNewResultStatusService
      .searchResponseToAPI()
      .toPromise()
      .then((message: any) => {
        this.resultStatus = message;
        console.log("test",message);

        this.showTable = true;
      });
  }



  // archive(id:number){
  //   this.addNewResultStatusService.archiveResultStatus(id)
  //   .toPromise()
  //   .then((result:any) => {
  //     console.log(result);

  //   })
  //   .catch((exception:any) => {
  //     alert(exception);
  //   });
  // }

  archive(id:number) {
    //this.selectedTranscriptsForTables.splice(this.selectedTranscriptsForTables.index(0),1);
    // delete this.selectedTranscriptsForTables[i];
    // this.selectedTranscriptsForTables.pop(i);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this change!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'The record has been deleted.',
          'success'
        )
        this.addNewResultStatusService.archiveResultStatus(id)
          .toPromise()
          .then((result:any) => {
            console.log(result);

          })
          .catch((exception:any) => {
            alert(exception);
          });
      }
    })
  }


  close(){
    this.router.navigate(['master-data/transcript-type-and-result-type']);
  }

  camelCaseText(word:string): string {
    const words = word.split(' ');

    const camelCaseWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    return camelCaseWords.join(' ');
  }

  showResultTypeError(){
    let touched = !(this.resultStatusName == undefined);
    if(!touched){
      return false;
    }
    let pattern: RegExp = /^[a-zA-Z ]+$/;
    let patternMatch = pattern.test(this.resultStatusName);
    if(patternMatch==true){
      this.addButtonDisabled=false;
    }else {
      this.addButtonDisabled=true;
    }
    console.log(patternMatch)
    return touched && !patternMatch;

  }

}
