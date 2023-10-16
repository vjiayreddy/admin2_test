export const accessRoutes = [
  {
    resource: "store_order",
    routeName: "Orders",
    url: "/orders",
    adminMenu: true,
  },
  {
    resource: "lead",
    routeName: "Leads",
    url: "/leads",
    adminMenu: true,
  },
  {
    resource: "customer_info_form",
    routeName: "Customer Info Form",
    url: "/customerInfo",
    adminMenu: true,
  },
  {
    resource: "store_order_tracking",
    routeName: "Track Orders",
    url: "/orders/track-order",
    adminMenu: true,
  },
  {
    resource: "styleclub",
    routeName: "All StyleClub Users",
    url: "/styleclub/allUsers",
    adminMenu: true,
  },
  {
    resource: "recommendation",
    routeName: "Recommendation",
    url: "/recommendation",
    adminMenu: false,
  },
  {
    resource: "appointment",
    routeName: "Appointment",
    url: "/appointment",
    adminMenu: true,
  },
  {
    resource: "trial_module",
    routeName:"Trial ",
    url: "/trial",
    adminMenu: true,
  }
];
