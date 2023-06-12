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
          "icon": 'description',
          "items": [
            {
              "label": "Payment reconciliation",
              "routeLink": "finance-services/transcript/payment-reconciliation",
              "icon": "payment",
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
          "icon": "description",
          "items": [
            {
              "label": "Verify transcript",
              "routeLink": "/exam/transcript/verify-transcript",
              "icon": "verified_user",
              "items": []
            },
            {
              "label": "Print transcript",
              "routeLink": "/exam/transcript/print-transcript",
              "icon": "print",
              "items": []
            }
          ]
        },
        {
          "label": "Master data",
          "routeLink": "/exam/master-data",
          "icon": "list",
          "items": [
            {
              "label": "Day quota allocation",
              "routeLink": "/exam/master-data/day-quota-allocation",
              "icon": "today",
              "items": []
            },
            {
              "label": "Merge transcript & result types",
              "routeLink": "/exam/master-data/transcript-type-and-result-type",
              "icon": "merge_type",
              "items": []
            },
            {
              "label": "Result type",
              "routeLink": "/exam/master-data/result-type",
              "icon": "playlist_add_check",
              "items": []
            },
            {
              "label": "Transcript type",
              "routeLink": "/exam/master-data/transcript-type",
              "icon": "note",
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
          "icon": "list",
          "items": [
            {
              "label": "Merge role & route",
              "routeLink": "/user-management/master-data/role-route-management",
              "icon": "merge_type",
              "items": []
            },
            {
              "label": "User role management",
              "routeLink": "/user-management/master-data/user-role-management",
              "icon": "supervised_user_circle",
              "items": []
            },
            {
              "label": "Role management",
              "routeLink": "/user-management/master-data/role-management",
              "icon": "business",
              "items": []
            },
            {
              "label": "Route management",
              "routeLink": "/user-management/master-data/route-management",
              "icon": "directions",
              "items": []
            }
          ]
        }
      ]
    }
  ];
