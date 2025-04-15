import { RouteObject } from "react-router-dom";

import { ROUTE_PATHS } from "../../common/path";
import Dashboard from "./Dashboard";
import Product from "./Product";
import Order from "./Order";
import Customer from "./Customer";
import Payment from "./Payment";

export const adminRoute: RouteObject[] = [
    {
        id: "adminDashboard",
        path: ROUTE_PATHS.MANAGE_DASHBOARD,
        element: <Dashboard />,
    },
    {
        id: "adminProduct",
        path: ROUTE_PATHS.MANAGE_TOUR,
        element: <Product />,
    },
    {
        id: "adminOrder",
        path: ROUTE_PATHS.MANAGE_ORDER,
        element: <Order />,
    },
    {
        id: "adminCustomer",
        path: ROUTE_PATHS.MANAGE_USER,
        element: <Customer />,
    },
    {
        id: "adminPayment",
        path: ROUTE_PATHS.MANAGE_PAYMENT,
        element: <Payment />,
    },
];
