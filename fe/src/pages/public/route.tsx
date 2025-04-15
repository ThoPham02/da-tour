import { RouteObject } from "react-router-dom";

import { ROUTE_PATHS } from "../../common/path";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import TourDetail from "./TourDetail";

export const publicRoute: RouteObject[] = [
  {
    id: "homeRoot",
    path: ROUTE_PATHS.ROOT,
    element: <Home />,
  },
  {
    id: "home",
    path: ROUTE_PATHS.HOME,
    element: <Home />,
  },
  {
    id: "login",
    path: ROUTE_PATHS.LOGIN,
    element: <Login />,
  },
  {
    id: "register",
    path: ROUTE_PATHS.REGISTER,
    element: <SignUp />,
  },
  {
    id: "detail",
    path: ROUTE_PATHS.DETAIL_TOUR,
    element: <TourDetail />,
  },
];
