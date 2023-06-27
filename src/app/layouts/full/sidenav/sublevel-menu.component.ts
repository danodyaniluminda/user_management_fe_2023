import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOut, INavbarData } from './helper';
import {PermissionService} from "../../../shared/services/permission.service";
import {AuthenticationService} from "../../../shared/_services";

@Component({
  selector: 'app-sublevel-menu',
  template: `
    <ul *ngIf="collapsed && data.items && data.items.length > 0 && data.hasPermission"
    [@submenu]="expanded
      ? {value: 'visible',
          params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '*'}}
      : {value: 'hidden',
          params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '0'}}"
      class="sublevel-nav"
    >
      <li *ngFor="let item of data.items" class="sublevel-nav-item">
          <a class="sublevel1-nav-link"
          (click)="handleClick(item)"
            *ngIf="item.items && item.items.length > 0 && item.hasPermission"
            [ngClass]="getActiveClass(item)"
          >
<!--            {{item|json}}-->
<!--            <i class="sublevel-link-icon fa fa-circle"></i>-->
<!--            <mat-icon class="sublevel-link-icon">{{item.icon}}</mat-icon>-->
<!--            <mat-icon>{{ item.icon }}</mat-icon>-->
<!--            <mat-icon class="sublevel-link-icon">fiber_manual_record</mat-icon>-->

            <mat-icon class="sublevel1-link-icon">{{ item.icon }}</mat-icon>
            <span class="sublevel1-link-text" @fadeInOut
                *ngIf="collapsed">{{item.label}}</span>
            <mat-icon *ngIf="item.items && collapsed" class="menu-collapse-icon">
              {{ !item.expanded ? 'keyboard_arrow_right' : 'keyboard_arrow_down' }}
            </mat-icon>
          </a>
          <a class="sublevel-nav-link"
            *ngIf="!item.items || (item.items && item.items.length === 0) && item.hasPermission"
            [routerLink]="[item.routeLink]"
            routerLinkActive="active-sublevel"
            [routerLinkActiveOptions]="{exact: true}"
          >
            <mat-icon class="sublevel-link-icon">{{ item.icon }}</mat-icon>
            <span class="sublevel-link-text" @fadeInOut
               *ngIf="collapsed">{{item.label}}</span>
          </a>
          <div *ngIf="item.items && item.items.length > 0">
            <app-sublevel-menu
              [data]="item"
              [collapsed]="collapsed"
              [multiple]="multiple"
              [expanded]="item.expanded"
            ></app-sublevel-menu>
          </div>
      </li>
    </ul>
  `,
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    fadeInOut,
    trigger('submenu', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible <=> hidden', [style({overflow: 'hidden'}),
        animate('{{transitionParams}}')]),
      transition('void => *', animate(0))
    ])
  ]
})
export class SublevelMenuComponent implements OnInit {

  @Input() data: INavbarData = {
    routeLink: '',
    icon: '',
    label: '',
    hasPermission:true,
    items: []
  }
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;
  private permissions: any;

  constructor(public router: Router,private sideNavService:PermissionService,private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
  }

  handleClick(item: any): void {
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for(let modelItem of this.data.items) {
          if (item !==modelItem && modelItem.expanded) {
            modelItem.expanded = false;
            // console.log("modelItem",modelItem)?
          }
        }
      }
    }
    item.expanded = !item.expanded;
    this.getPermissions(item)
  }

  getActiveClass(item: INavbarData): string {
    return item.expanded && this.router.url.includes(item.routeLink)
      ? 'active-sublevel'
      : '';
  }

  getPermissions(item:INavbarData) {
    this.sideNavService
      .getPermission(this.authenticationService.currentUserValue.role)
      .toPromise()
      .then((res: any) => {
        this.permissions = res;
        this.handlePermissions(res,item.items);
      })
  }


  handlePermissions(permissions: any, navData: any) {
    for(let modelItem of navData) {
      for (let item of Object.keys(permissions)){
        if (permissions[item].routeLink.toLowerCase()==modelItem.routeLink.toLowerCase()){
          modelItem.hasPermission = true;
        }
      }
    }
  }
}
