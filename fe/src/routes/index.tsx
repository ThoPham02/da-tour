import { createBrowserRouter, Navigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/redux"; // Đảm bảo file `store/index.ts` export RootState

import { publicRoute } from "../pages/public/route";
import { ROUTE_PATHS } from "../common/path";
import { ErrorLayout, DefaultLayout, ManageLayout } from "../components/layout";
import { adminRoute } from "../pages/admin/route";

// Kiểu cho Props của ProtectedRoute
interface ProtectedRouteProps {
  element: React.ReactElement;
  allowedRoles: number[];
  redirectPath?: string;
}

// ProtectedRoute: kiểm tra quyền truy cập theo role
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  allowedRoles,
  redirectPath = ROUTE_PATHS.ROOT,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return user && allowedRoles.includes(user.role ?? 2) ? (
    element
  ) : (
    <Navigate to={redirectPath} replace />
  );
};

// Router chính
const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.ROOT,
    element: <DefaultLayout />,
    errorElement: <ErrorLayout />,
    children: publicRoute,
  },
  {
    path: ROUTE_PATHS.ROOT,
    element: <ManageLayout />,
    errorElement: <ErrorLayout />,
    children: adminRoute,
  },
]);

export default router;
