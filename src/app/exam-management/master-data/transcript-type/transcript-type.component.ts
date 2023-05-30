import {Component, OnInit, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {AddNewTranscriptTypeService} from "./add-new-transcript-type.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ReplaySubject, Subject, takeUntil} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'exam-transcript-type',
  templateUrl: './transcript-type.component.html',
  styleUrls: ['./transcript-type.component.css']
})
export class TranscriptTypeComponent implements OnInit {

  programmes: any;

  constructor(
    private addNewTranscriptTypeService:AddNewTranscriptTypeService,
    private router:Router
  ) { }

  transcriptTypes:any[] = [];
  transcriptTypeDT = new MatTableDataSource(this.transcriptTypes);

  prospecifictranscriptTypes:any[] = [];
  isShowSpecificField=false;
  isShowNormal = false;
  // isShowButtons = false;
  addButtonDisabled :boolean=true;
  transcripts: any[];

  transcriptName:string ;
  transcriptType:string;
  programmeId:number = -1;

  displayedColumns = ['id', 'transcript_type_id', 'transcript_name', 'programme_name', 'delete']

  age = 10;
  showDiv=true;

  @ViewChild('paginator') paginator!: MatPaginator;


  hideDive(){
    this.showDiv=false;
  }

  public filteredProgrammes: ReplaySubject<any> = new ReplaySubject<any>(1);
  public programmeFilterCtrl: FormControl = new FormControl('');
  protected _onDestroy = new Subject<void>();

  ngOnInit(): void {
    this.fetchAllTranscriptTypes();
    this.fetchAllProSpecificTransType();
    this.fetchAllProgrammes();
    this.search();
    //console.log("specif",this.isShowSpecificField);
  }

  isSpecific(){
    // alert("work")
    this.isShowSpecificField=true;
    this.isShowNormal=true;
    // this.isShowButtons = true;
    // this.addButtonDisabled = false;


    // console.log("specif",this.isShowSpecificField);
  }
  isNormal(){
    this.isShowNormal = true;
    this.isShowSpecificField=false;
    // this.isShowButtons = true;
    // this.addButtonDisabled = false;
  }

  onTranscriptTypeClick(){
    // this.addButtonDisabled = false;
  }

  fetchAllTranscriptTypes(){
    this.addNewTranscriptTypeService.getAllTranscriptType()
      .toPromise()
      .then((result:any) => {
        this.transcriptTypes = result;
        this.transcriptTypeDT = new MatTableDataSource(this.transcriptTypes);
        this.transcriptTypeDT.paginator = this.paginator;
        // console.log(this.transcriptTypes);
      })
      .catch((exception:any) => {
        alert(exception);
      });
  }

  fetchAllProSpecificTransType(){
    this.addNewTranscriptTypeService.getAllProgSpecificTransTypes()
      .toPromise()
      .then((result:any) => {

        this.prospecifictranscriptTypes = result;
        // console.log(this.transcriptTypes);
      })
      .catch((exception:any) => {
        alert(exception);
      });
  }

  fetchAllProgrammes() {
    this.addNewTranscriptTypeService
      .getAllProgrammes()
      .toPromise()
      .then((result: any) => {
        this.filteredProgrammes.next(this.programmes);
        console.log("All-programmes",result);
        this.programmes = result;
        //this.programmeId = this.programmes[0].id;
      })
      .catch((exception:any) => {
        alert(exception);
      });
  }

  filterTranscriptType($event:any){
    this.addButtonDisabled = false;
    let key = $event.target.value;
    let filtered = this.transcriptTypes.filter(transcript => transcript.name.includes(key));
    console.log(filtered);
    //https://stackoverflow.com/questions/61303594/angular-material-input-and-select-inside-one-form-field-in-single-row
  }

  // filterResultStatus($event:any){
  //   this.addButtonDisabled = false;
  //   let key = $event.target.value;
  //   let filtered = this.resultStatuses.filter(status => status.name.includes(key));
  //   console.log(filtered);
  //
  // }

  onProgrammeChange(target:any){
    this.programmeId = target.value;
  }

  addNewTranscriptType(){
    if(this.transcriptType==undefined || this.transcriptType.length==0){
      Swal.fire('Transcript type is empty!', 'Please select the transcript type.', 'error');
      return;
    }
    if(this.transcriptName==undefined || this.transcriptName.trim().length==0){
      Swal.fire('Transcript name is empty!', 'Please enter the transcript name.', 'error');
      return;
    }
    this.transcriptName = this.camelCaseText(this.transcriptName.trim());

    let tmpFilteredTranscriptTypes = this.transcriptTypes.filter((tt: {name:any, type: any}) => tt.name == this.transcriptName.trim() && tt.type == this.transcriptType);


    if(this.transcriptType=='Normal'){
      console.log("AddNewNormalTranscriptType -> " , this.transcriptName + " & " + this.transcriptType);

      if(tmpFilteredTranscriptTypes.length>0){
        Swal.fire('Oops!', 'Entered details are already exists! ', 'error');

        return;
      }


      this.addNewTranscriptTypeService.addNewTranscrpitType(this.transcriptName.trim(),this.transcriptType)
        .toPromise()
        .then((result:any) => {
          console.log(result);
        })
        .catch((exception:any) => {
          alert(exception);
        });
    }else if(this.transcriptType=='Specific'){

      if(this.programmeId==-1){
        Swal.fire('Programme name is empty!', 'Please select the programme name.', 'error');
        return;
      }


      console.log("AddNewSpecificTranscriptType -> " , this.transcriptName + " & " + this.transcriptType + " & " + this.programmeId);


      if(tmpFilteredTranscriptTypes.length>0){

        for (let tt of tmpFilteredTranscriptTypes){
          console.log(tt.id,tt.name)

          /*for(let pst of this.prospecifictranscriptTypes){
            console.log(pst.transcriptType.id, pst.transcriptType.id==tt.id, pst.programme.id,pst.programme.id==this.programmeId)
            if(pst.transcriptType.id==tt.id && pst.programme.id==this.programmeId){
              Swal.fire('ERROR', 'Entered details are already exists!', 'error');
              return;
            }
          }*/


          let tmpFilteredProspecifictranscriptTypes = this.prospecifictranscriptTypes.filter((pst: any) => pst.transcriptType.id==tt.id && pst.programme.id==this.programmeId);
          if(tmpFilteredProspecifictranscriptTypes.length>0){
            Swal.fire('Error.....', 'Entered details are already exists!', 'error');
            return;
          }
        }
      }


      this.addNewTranscriptTypeService.addNewTranscrpitType(this.transcriptName,this.transcriptType,this.programmeId)
        .toPromise()
        .then((result:any) => {
          console.log(result);
        })
        .catch((exception:any) => {
          alert(exception);
        });
    }


  }

  showTranscriptNameError(){
    let touched = !(this.transcriptName == undefined);
    if(!touched){
      return false;
    }
    let pattern: RegExp = /^[a-zA-Z ]+$/;
    let patternMatch = pattern.test(this.transcriptName);
    if(patternMatch==true){
      this.addButtonDisabled=false;
    }else {
      this.addButtonDisabled=true;
    }
    return touched && !patternMatch;
  }

  search() {
    // this.showTable=false;
    this.addNewTranscriptTypeService
      .searchResponseToAPI()
      .toPromise()
      .then((message: any) => {
        this.transcriptType = message;
        console.log("test",message);

        // this.showTable = true;
      });
  }

  getProgrammeName(id:number){
    let prospecifictranscriptType =  this.prospecifictranscriptTypes.find(e => e.transcriptType.id===id)
    if(prospecifictranscriptType){
      return prospecifictranscriptType.programme.name;
    }else{
      return "---"
    }


  }

  // archive(id:number){
  //   this.addNewTranscriptTypeService.archiveTranscrpitType(id)
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
        this.addNewTranscriptTypeService.archiveTranscrpitType(id)
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

  cancel(){
    console.log("Cancel");
    window.location.reload();
  }

// ./transcript-type-and-result-type
  close(){
    this.router.navigate(['master-data/transcript-type-and-result-type']);
  }

  programmeChange(target:any) {
    this.programmeId = target.value;
    console.log(this.programmes);

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
      this.programmes.filter((programme: { name: string; }) => programme.name.toLowerCase().indexOf(search) > -1)
    );
  }

  camelCaseText(word:string): string {
    const words = word.split(' ');

    const camelCaseWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    return camelCaseWords.join(' ');
  }

}
