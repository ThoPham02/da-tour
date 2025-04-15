// api.ts
export const API_URL = {
    LOGIN: "auth/login",
  } as const;
  
  // route-paths.ts
  export const ROUTE_PATHS = {
    // public routes
    ROOT: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    HOME: "/home",
    ERROR: "/error",
    DETAIL_TOUR: "/tour/:id",

    // admin routes
    MANAGE_DASHBOARD: "/admin/dashboard",
    MANAGE_TOUR: "/admin/manage-tour",
    MANAGE_ORDER: "/admin/manage-order",
    MANAGE_USER: "/admin/manage-user",
    MANAGE_PAYMENT: "/admin/manage-payment",
  } as const;
  
  export const BREADCRUMB_DETAIL: Record<string, string> = {
    [ROUTE_PATHS.HOME]: "Trang chủ",
    [ROUTE_PATHS.ERROR]: "Lỗi",
  };
  