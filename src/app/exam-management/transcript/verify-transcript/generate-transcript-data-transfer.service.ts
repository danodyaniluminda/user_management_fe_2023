import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateTranscriptDataTransferService {

  constructor() { }

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


  jsonDataPrintTranscript = [
    {
      "offCourseCode": [
        {
          "id": "ECF2301"
        },
        {
          "id": "ECF2350"
        }
      ],
      "title": [
        {
          "name": "PrinciplesofElectricity"
        },
        {
          "name": "PrinciplesofWater"
        }
      ],
      "gradeOffCode": [
        {
          "grade": "A+"
        },
        {
          "grade": "B-"
        }
      ],
      "equCourseCode": [
        {
          "id": "BVX3350"
        },
        {
          "id": "BVX3350"
        }
      ],
      "creditRatingAward": [
        {
          "rating": "03"
        },
        {
          "rating": "05"
        }
      ],
      "gpv": "3.30"
    },
    {
      "offCourseCode": [
        {
          "id": "ECF2301"
        },
        {
          "id": "ECF2350"
        }
      ],
      "title": [
        {
          "name": "PrinciplesofElectricity"
        },
        {
          "name": "PrinciplesofWater"
        }
      ],
      "gradeOffCode": [
        {
          "grade": "A+"
        },
        {
          "grade": "B-"
        }
      ],
      "equCourseCode": [
        {
          "id": "BVX3350"
        },
        {
          "id": "BVX3350"
        }
      ],
      "creditRatingAward": [
        {
          "rating": "03"
        },
        {
          "rating": "05"
        }
      ],
      "gpv": "3.30"
    }
  ]

}
