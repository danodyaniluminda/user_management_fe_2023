import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {Component, Output, EventEmitter, OnInit, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {fadeInOut, INavbarData} from './helper';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

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
  navData: INavbarData[];
  multiple: boolean = false;
  subItem: INavbarData[];

  constructor(public router: Router, private http: HttpClient) {
    http.get<INavbarData[]>(GENERATE_TRANSCRIPT_API + 'getMenu').subscribe((res) => this.navData = res);
  }

  ngOnInit(): void {

  }

  handleClick(item: INavbarData): void {

    let queryParams:HttpParams = new HttpParams();

    queryParams = queryParams.append("rootId", item.id);
    this.http.get<INavbarData[]>(GENERATE_TRANSCRIPT_API + 'get_menu_by_root_id', {params: queryParams}).subscribe((res) => {
      this.subItem = res
      console.log(this.subItem);
      this.shrinkItems(this.subItem);
    });

    item.expanded = !item.expanded
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  shrinkItems(item: INavbarData[]): void {
    if (!this.multiple) {
      for (let modelItem of item) {
        modelItem.expanded = false;
      }
    }
  }
}
