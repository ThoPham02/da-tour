import { RouteObject } from "react-router-dom";
import React from "react";

import { ROUTE_PATHS } from "../../common/path";
import Home from "./Home";

export const publicRoute: RouteObject[] = [
  {
    id: "list_house_public",
    path: ROUTE_PATHS.ROOT,
    element: React.createElement(Home),
  },
];
