import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import {HttpClient, HttpParameterCodec} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  private GENERATE_TRANSCRIPT_API= environment.base_url_user_mgt + '/api/user_management/menu/';

  constructor(
    public router: Router, private http: HttpClient,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    http.get(this.GENERATE_TRANSCRIPT_API + 'getMenu').subscribe((res) => {
      this.menuItem = res
      console.log(this.menuItem)
    });
  }



  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  menuItem: any;
}
