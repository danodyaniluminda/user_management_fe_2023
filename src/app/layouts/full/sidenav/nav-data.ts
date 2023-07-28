import {INavbarData} from "./helper";

export const navbarData: INavbarData[] =
  [
    {
      "label": "Completion module",
      "routeLink": "completion-module",
      "hasPermission":false,
      "icon": "account_balance",
      "items": [


        {  "label": "Generate Result",
          "routeLink": "completion-module/generate-result",
          "icon": 'description',
          "hasPermission": false,
          "items": [
            {
              "label": "Completion module",
              "routeLink": "/completion-module/generate-result/completion-module",
              "icon": "account_balance",
              "hasPermission":false,
              "items": []
            },
            {
              "label": "Table Management",
              "routeLink": "/completion-module/table-management",
              "icon": "description",
              "hasPermission":false,
              "items": [],
            },
            {
              "label": "Student management",
              "routeLink": "/completion-module/generate-result/student-management",
              "icon": "account_balance",
              "hasPermission":false,
              "items": []
            },
          ]
        },

      ]
    },
    {
      "label": "Finance services",
      "routeLink": "finance-services",
      "hasPermission":false,
      "icon": "account_balance",
      "items": [
        {
          "label": "Transcript",
          "routeLink": "finance-services/transcript",
          "icon": 'description',
          "hasPermission":false,
          "items": [
            {
              "label": "Payment reconciliation",
              "routeLink": "/finance-services/transcript/payment-reconciliation",
              "icon": "account_balance",
              "hasPermission":false,
              "items": []
            }
          ]
        }
      ]
    },
    {
      "label": "Exam management",
      "routeLink": "exam",
      "icon": "school",
      "hasPermission":false,
      "items": [
        {
          "label": "Transcript",
          "routeLink": "exam/transcript",
          "icon": "description",
          "hasPermission":false,
          "items": [
            {
              "label": "Verify transcript",
              "routeLink": "/exam/transcript/verify-transcript",
              "icon": "verified_user",
              "hasPermission":false,
              "items": []
            },
            {
              "label": "Print transcript",
              "routeLink": "/exam/transcript/print-transcript",
              "hasPermission":false,
              "icon": "print",
              "items": []
            }
          ]
        },
        {
          "label": "Master data",
          "routeLink": "/exam/master-data",
          "hasPermission":false,
          "icon": "list",
          "items": [
            {
              "label": "Day quota allocation",
              "routeLink": "/exam/master-data/day-quota-allocation",
              "hasPermission":false,
              "icon": "today",
              "items": []
            },
            {
              "label": "Merge transcript & result types",
              "routeLink": "/exam/master-data/transcript-type-and-result-type",
              "icon": "merge_type",
              "hasPermission":false,
              "items": []
            },
            {
              "label": "Result type",
              "routeLink": "/exam/master-data/result-type",
              "icon": "playlist_add_check",
              "hasPermission":false,
              "items": []
            },
            {
              "label": "Transcript type",
              "routeLink": "/exam/master-data/transcript-type",
              "hasPermission":false,
              "icon": "note",
              "items": []
            }
          ]
        }
      ]
    },
    {
      "label": "User management",
      "routeLink": "user-management",
      "hasPermission":false,
      "icon": "group",
      "items": [
        {
          "label": "Master data",
          "routeLink": "/user-management/master-data",
          "hasPermission":false,
          "icon": "list",
          "items": [
            {
              "label": "Merge role & route",
              "routeLink": "/user-management/master-data/role-route-management",
              "icon": "merge_type",
              "hasPermission":false,
              "items": []
            },
            {
              "label": "User role management",
              "routeLink": "/user-management/master-data/user-role-management",
              "icon": "supervised_user_circle",
              "hasPermission":false,
              "items": []
            },
            {
              "label": "Role management",
              "routeLink": "/user-management/master-data/role-management",
              "hasPermission":false,
              "icon": "business",
              "items": []
            },
            {
              "label": "Route management",
              "routeLink": "/user-management/master-data/route-management",
              "icon": "directions",
              "hasPermission":false,
              "items": []
            }
          ]
        }
      ]
    },
    {
      "label": "Gateway Manage",
      "routeLink": "gateway-management",
      "icon": "cloud_upload",
      "hasPermission":false,
      "items": [
        {
          "label": "Gateway",
          "routeLink": "/gateway-management/gateway",
          "icon": 'cloud_upload',
          "hasPermission":false,
          "items": [
            {
              "label": "Gateway Routes",
              "routeLink": "/gateway-management/gateway/gateway-routes",
              "icon": "account_balance",
              "hasPermission":false,
              "items": []
            }
          ]
        }
      ]
    }
  ];
