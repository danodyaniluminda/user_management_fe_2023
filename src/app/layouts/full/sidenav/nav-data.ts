import {INavbarData} from "./helper";

export const navbarData: INavbarData[] =
  [
    {
      "label": "Finance services",
      "routeLink": "",
      "icon": "account_balance",
      "items": [
        {
          "label": "Transcript",
          "routeLink": "finance-services/transcript",
          "icon": 'account_balance',
          "items": [
            {
              "label": "Payment reconciliation",
              "routeLink": "finance-services/transcript/payment-reconciliation",
              "icon": "account_balance",
              "items": []
            }
          ]
        }
      ]
    },
    {
      "label": "Exam management",
      "routeLink": "",
      "icon": "school",
      "items": [
        {
          "label": "Transcript",
          "routeLink": "exam/transcript",
          "icon": "",
          "items": [
            {
              "label": "Verify transcript",
              "routeLink": "/exam/transcript/verify-transcript",
              "icon": "",
              "items": []
            },
            {
              "label": "Print transcript",
              "routeLink": "/exam/transcript/print-transcript",
              "icon": "",
              "items": []
            }
          ]
        },
        {
          "label": "Master data",
          "routeLink": "/exam/master-data",
          "icon": "",
          "items": [
            {
              "label": "Day quota Allocation",
              "routeLink": "/exam/master-data/day-quota-allocation",
              "icon": "",
              "items": []
            },
            {
              "label": "Transcript type & result type",
              "routeLink": "/exam/master-data/transcript-type-and-result-type",
              "icon": "",
              "items": []
            },
            {
              "label": "Result type",
              "routeLink": "/exam/master-data/result-type",
              "icon": "",
              "items": []
            },
            {
              "label": "Transcript type",
              "routeLink": "/exam/master-data/transcript-type",
              "icon": "",
              "items": []
            }
          ]
        }
      ]
    },
    {
      "label": "User management",
      "routeLink": "",
      "icon": "group",
      "items": [
        {
          "label": "Master data",
          "routeLink": "/user-management/master-data",
          "icon": "",
          "items": [
            {
              "label": "Role route management",
              "routeLink": "/user-management/master-data/role-route-management",
              "icon": "",
              "items": []
            },
            {
              "label": "User role management",
              "routeLink": "/user-management/master-data/user-role-management",
              "icon": "",
              "items": []
            },
            {
              "label": "Role management",
              "routeLink": "/user-management/master-data/role-management",
              "icon": "",
              "items": []
            },
            {
              "label": "Route management",
              "routeLink": "/user-management/master-data/route-management",
              "icon": "",
              "items": []
            }
          ]
        }
      ]
    }
  ];
