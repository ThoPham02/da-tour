import { RouteObject } from "react-router-dom";

import { ROUTE_PATHS } from "../../common/path";
import Customer from "./Customer";
import DashboardPage from "./dashboard/DashboardPage";
import ToursPage from "./tours/ToursPage";
import OrdersPage from "./orders/OrdersPage";
import PaymentsPage from "./payments/PaymentsPage";

export const adminRoute: RouteObject[] = [
    {
        id: "adminDashboard",
        path: ROUTE_PATHS.MANAGE_DASHBOARD,
        element: <DashboardPage />,
    },
    {
        id: "adminProduct",
        path: ROUTE_PATHS.MANAGE_TOUR,
        element: <ToursPage />,
    },
    {
        id: "adminOrder",
        path: ROUTE_PATHS.MANAGE_ORDER,
        element: <OrdersPage />,
    },
    {
        id: "adminCustomer",
        path: ROUTE_PATHS.MANAGE_USER,
        element: <Customer />,
    },
    {
        id: "adminPayment",
        path: ROUTE_PATHS.MANAGE_PAYMENT,
        element: <PaymentsPage />,
    },
];
