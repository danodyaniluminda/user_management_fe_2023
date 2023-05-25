import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: "/exam/transcript/verify-transcript", name: 'verify-transcript', type: 'link', icon: 'av_timer' },
  { state: '/exam/transcript/print-transcript', type: 'link', name: 'print-transcript', icon: 'crop_7_5' },
  { state: '/finance-services/transcript/payment-reconciliation', type: 'link', name: 'payment-reconciliation', icon: 'crop_7_5' },
  { state: '/exam/master-data/day-quota-allocation', type: 'link', name: 'day-quota-allocation', icon: 'view_comfy' },
  { state: '/exam/master-data/transcript-type', type: 'link', name: 'transcript-type', icon: 'view_list' },
  { state: '/exam/master-data/result-type', type: 'link', name: 'result-type', icon: 'web' },
  { state: '/exam/master-data/transcript-type-and-result-type', type: 'link', name: 'transcript-type-and-result-type', icon: 'web' },
  { state: '/exam/master-data/day-quota-allocation', type: 'link', name: 'day-quota-allocation', icon: 'web' }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
