import { MediaMatcher } from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, AfterViewInit, OnInit} from '@angular/core';
import {PermissionService} from "../../shared/services/permission.service";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: []
})
export class FullComponent implements OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  isSideNavCollapsed = false;
  screenWidth = 0;
  constructor(
    private permissionService:PermissionService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {}


}
