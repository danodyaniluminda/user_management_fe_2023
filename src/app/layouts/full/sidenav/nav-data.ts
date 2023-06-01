import {INavbarData} from "./helper";

export const navbarData: INavbarData[] = [
  {
    routeLink: 'exam',
    icon: 'alarm',
    label: 'Exam management',
    items: [
      {
        routeLink: '/exam/transcript',
        label: 'Transcript',
        items: [
          {
            routeLink: '/exam/transcript/verify-transcript',
            label: 'Verify transcript',
          },
          {
            routeLink: '/exam/transcript/print-transcript',
            label: 'Print transcript',
          },
        ]
      },
      {
        routeLink: '/exam/master-data',
        label: 'Master data',
        items: [
          {
            routeLink: '/exam/master-data/day-quota-allocation',
            label: 'Day quota Allocation',
          },
          {
            routeLink: '/exam/master-data/result-type',
            label: 'Result type',
          },
          {
            routeLink: '/exam/master-data/transcript-type',
            label: 'Transcript type',
          },
          {
            routeLink: '/exam/master-data/transcript-type-and-result-type',
            label: 'Transcript type and result type',
          },
        ]
      }
    ]
  },
  {
    routeLink: 'user-management',
    icon: 'man',
    label: 'User management',
    items: [
      {
        routeLink: '/user-management/master-data',
        label: 'Master data',
        items: [
          {
            routeLink: '/user-management/master-data/role-management',
            label: 'Role management',
          },
          {
            routeLink: '/user-management/master-data/route-management',
            label: 'Route management',
          },
          {
            routeLink: '/user-management/master-data/user-role-management',
            label: 'User role management',
          },
          {
            routeLink: '/user-management/master-data/role-route-management',
            label: 'Role route management',
          },
        ]
      }
    ]
  },
];
