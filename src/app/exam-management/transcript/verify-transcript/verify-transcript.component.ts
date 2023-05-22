import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'exam-verify-transcript',
  templateUrl: './verify-transcript.component.html',
  styleUrls: ['./verify-transcript.component.css']
})
export class VerifyTranscriptComponent implements OnInit {


  verifyTabDisabled: Boolean = true;
  selectedTabIndex: number = 0;

  constructor(private router: Router) {
  }

  ngOnInit(): void {


  }

  addItem(isDisabled: Boolean) {

    this.verifyTabDisabled = isDisabled;
    this.selectedTabIndex = 1;

  }

  changeIndex(){
    console.log("Change");
    this.selectedTabIndex = 0;
  }



  disabled(event: any) {
    if (event != 1) {
      this.verifyTabDisabled = true;
    } else {
      this.verifyTabDisabled = false;
    }
    this.selectedTabIndex = event;
  }

}
