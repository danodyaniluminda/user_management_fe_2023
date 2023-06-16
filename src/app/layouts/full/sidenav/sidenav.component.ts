import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import {Component, Output, EventEmitter, OnInit, HostListener, AfterContentInit, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOut, INavbarData } from './helper';
import { navbarData } from './nav-data';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {PermissionService} from "../../../shared/services/permission.service";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

const GENERATE_TRANSCRIPT_API = environment.base_url_user_mgt + '/api/user_management/menu/';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})

export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = true;
  screenWidth = 0;
  navData : INavbarData[]=navbarData;
  multiple: boolean = false;
  private subItem: INavbarData[];
  private rootLevel: INavbarData[];
  private permissions: INavbarData[];

  constructor(public router: Router, private http:HttpClient,private sideNavService:PermissionService) {
    // http.get<INavbarData[]>(GENERATE_TRANSCRIPT_API + 'getMenu').subscribe((res)=>this.rootLevel = res);
    // this.http.get<INavbarData[]>(GENERATE_TRANSCRIPT_API + 'get_permissions', {params: new HttpParams().append("role_name", 'admin')}).subscribe((res) =>this.subItem = res);
  }
  ngOnInit(): void {
    this.getPermissions();
  }

  getPermissions() {
    this.sideNavService
      .getPermission()
      .toPromise()
      .then((res: any) => {
        this.permissions = res;
        this.handlePermissions(res,this.navData);
      })
  }


  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    this.handlePermissions(this.permissions,item.items);
    item.expanded = !item.expanded
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      for(let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }

  handlePermissions(permissions: any, navData: any) {
    for(let modelItem of navData) {
      for (let item of Object.keys(permissions)){
        // console.log(modelItem.routeLink)
        // console.log(item,permissions[item].routeLink)
        if (permissions[item].routeLink.toLowerCase()==modelItem.routeLink.toLowerCase()){
          modelItem.hasPermission = true;
        }
      }
    }
  }
}
