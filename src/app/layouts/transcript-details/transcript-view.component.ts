import { Component, OnInit } from "@angular/core";
import { TranscriptViewService } from "./transcript-view.service";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-transcript-view",
  templateUrl: "./transcript-view.component.html",
  styleUrls: ["./transcript-view.component.scss"]
})

export class TranscriptViewComponent implements OnInit {
  transcriptDetails:any;
  studentDetails:any;
  id:any;
  academicPerformanceDetails:any;
  constructor(private transcriptViewService: TranscriptViewService, private _httpClient: HttpClient,private route: ActivatedRoute) { 

  }
  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.id = params.get('id');
      //console.log(this.id); // Output: zsShP6CHWR
    });
    this.getTranscriptTable(this.id);
  }

  getTranscriptTable(id: any): Promise<any> {
    return this.transcriptViewService
      .getTranscriptDetails(id)
      .toPromise()
      .then((result: any) => {
        this.transcriptDetails = result; // Assign the retrieved string value to a variable
        this.studentDetails = this.transcriptDetails.personalDetails;
        this.academicPerformanceDetails = this.transcriptDetails.academicPerformanceDetails;
        //console.log('transcriptDetails get value:', this.transcriptDetails);
        //console.log('studentDetails get value:', this.studentDetails);
        //console.log('academicPerformanceDetails get value:', this.academicPerformanceDetails);
        return this.transcriptDetails; // Return the retrieved string value
      });
  }
}
