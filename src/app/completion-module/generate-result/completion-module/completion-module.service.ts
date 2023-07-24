import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import {FormGroup} from "@angular/forms";

const GENERATE_STATUS_API = environment.graduation_completion +'/api/generateResult';
const CONTINUE_COURSE_API = environment.graduation_completion +'/api/graduation-completion/continuingCourse';
const OPEN_ELECTIVE_CHECK_LEVEL_3 = environment.graduation_completion +'/api/graduation-completion/optional-course-credits';
const OPEN_ELECTIVE_CHECK_LEVEL_5 = environment.graduation_completion +'/api/graduation-completion/optional-course-credits';
const GPA_CALCULATION = environment.graduation_completion +'/api/graduation-completion/gpa_calculation';
const REGULAR_COURSE_CHECK = environment.graduation_completion +'/api/graduation-completion/regular-course-credits';
@Injectable({
  providedIn: 'root'
})
export class AddNewCompletionService {

  constructor(private http: HttpClient) { }

  getAllProgrammes(): Observable<any> {

    let result = this.http.get(GENERATE_STATUS_API + '/getAllProgrammes');
    return new Observable(observable => {
      observable.next(result.toPromise().then((result: any) => {
        console.log("Result Status : ", result);
        observable.next(result);
        observable.complete();
      })
        .catch(error => {
          observable.next((error['error'].message));
          observable.complete();
        }));
    });

  }

  getCriteriaByProgrameId(programeid : any){
    const url = GENERATE_STATUS_API + '/getCritriaByProgrammeID';
    let queryParams = new HttpParams();

    queryParams = queryParams.append("id", programeid);

    const data = this.http.get(url, {params: queryParams}).toPromise();

    return new Observable(observable => {
      observable.next(data.then((result:any) => {

        // this.model.oneDayDates = result;

        observable.next(result);
        observable.complete();
      })
        .catch(error => {
          console.log(error);
        }));
    });
  }

  runContinueCourseCritiria(programeid : any){
    const url = CONTINUE_COURSE_API + '/checkCntCourse';
    let queryParams = new HttpParams();

    queryParams = queryParams.append("id", programeid);

    const data = this.http.get(url, {params: queryParams}).toPromise();

    return new Observable(observable => {
      observable.next(data.then((result:any) => {
        observable.next(result);
        observable.complete();
      })
        .catch(error => {
          console.log(error);
        }));
    });
  }


  updateFailedOrPassedCritiaStudent(programeid : any){
    const url = CONTINUE_COURSE_API + '/updateFailedOrPassedCritiaStudent';
    let queryParams = new HttpParams();

    queryParams = queryParams.append("id", programeid);

    const data = this.http.get(url, {params: queryParams}).toPromise();

    return new Observable(observable => {
      observable.next(data.then((result:any) => {
        console.log("result",result);
        observable.next(result);
        observable.complete();
      })
        .catch(error => {
          console.log(error);
        }));
    });
  }

  runOpenElectiveCheckLevel3Critiria(programeid : any){
    const url = OPEN_ELECTIVE_CHECK_LEVEL_3 + '/check-courses-need-to-be-converted';
    let queryParams = new HttpParams();

    queryParams = queryParams.append("id", programeid);
    queryParams = queryParams.append("level", 3);


    const data = this.http.get(url, {params: queryParams}).toPromise();

    return new Observable(observable => {
      observable.next(data.then((result:any) => {
        observable.next(result);
        observable.complete();
      })
        .catch(error => {
          console.log(error);
        }));
    });
  }

  updateFailedOrPassedCritiaOpenElectiveCheckLevel3 (programeid : any){
    const url = OPEN_ELECTIVE_CHECK_LEVEL_3 + '/check-open-elective-coursed-level-tree';
    let queryParams = new HttpParams();

    queryParams = queryParams.append("id", programeid);

    const data = this.http.get(url, {params: queryParams}).toPromise();

    return new Observable(observable => {
      observable.next(data.then((result:any) => {
        console.log("result",result);
        observable.next(result);
        observable.complete();
      })
        .catch(error => {
          console.log("error",error);
        }));
    });
  }

  runOpenElectiveCheckLevel5Critiria(programeid : any){
    const url = OPEN_ELECTIVE_CHECK_LEVEL_5 + '/check-courses-need-to-be-converted';
    let queryParams = new HttpParams();

    queryParams = queryParams.append("id", programeid);
    queryParams = queryParams.append("level", 5);


    const data = this.http.get(url, {params: queryParams}).toPromise();

    return new Observable(observable => {
      observable.next(data.then((result:any) => {
        observable.next(result);
        observable.complete();
      })
        .catch(error => {
          console.log(error);
        }));
    });
  }

  updateFailedOrPassedCritiaOpenElectiveCheckLevel5 (programeid : any){
    const url = OPEN_ELECTIVE_CHECK_LEVEL_5 + '/check-open-elective-coursed-level-five';
    let queryParams = new HttpParams();

    queryParams = queryParams.append("id", programeid);

    const data = this.http.get(url, {params: queryParams}).toPromise();

    return new Observable(observable => {
      observable.next(data.then((result:any) => {
        console.log("result",result);
        observable.next(result);
        observable.complete();
      })
        .catch(error => {
          console.log(error);
        }));
    });
  }



  runGpaCalculationCritiria(programeid : any){
    const url = GPA_CALCULATION + '';
    let queryParams = new HttpParams();

    queryParams = queryParams.append("id", programeid);



    const data = this.http.get(url, {params: queryParams}).toPromise();

    return new Observable(observable => {
      observable.next(data.then((result:any) => {
        observable.next(result);
        observable.complete();
      })
        .catch(error => {
          console.log(error);
        }));
    });
  }

  updateFailedOrPassedCritiaGpaCalculation (programeid : any){
    const url = GPA_CALCULATION  + '';
    let queryParams = new HttpParams();

    queryParams = queryParams.append("id", programeid);

    const data = this.http.get(url, {params: queryParams}).toPromise();

    return new Observable(observable => {
      observable.next(data.then((result:any) => {
        console.log("result",result);
        observable.next(result);
        observable.complete();
      })
        .catch(error => {
          console.log(error);
        }));
    });
  }

  // runRegularCourseCheckCritiria(programeid : any){
  //   const url = REGULAR_COURSE_CHECK + '/check-courses-need-to-be-converted';
  //   let queryParams = new HttpParams();
  //
  //   queryParams = queryParams.append("programId", programeid);
  //
  //
  //
  //   const data = this.http.get(url, {params: queryParams}).toPromise();
  //
  //   return new Observable(observable => {
  //     observable.next(data.then((result:any) => {
  //       observable.next(result);
  //       observable.complete();
  //     })
  //       .catch(error => {
  //         console.log(error);
  //       }));
  //   });
  // }

  runRegularCourseCheckCritiria (programeid : any){
    const url = REGULAR_COURSE_CHECK  + '/check-regular-course-credits-passed';
    let queryParams = new HttpParams();
    queryParams = queryParams.append("programId", 164);
    queryParams = queryParams.append("noOfCreditsRequired", 24);
    queryParams = queryParams.append("level", 3);

    const data = this.http.get(url, {params: queryParams}).toPromise();

    return new Observable(observable => {
      observable.next(data.then((result:any) => {
        console.log("result",result);
        observable.next(result);
        observable.complete();
      })
        .catch(error => {
          console.log(error);
        }));
    });
  }



}
