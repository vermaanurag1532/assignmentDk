import React from "react";
import { Route, Navigate, Outlet } from "react-router";

import { useAuth } from "hooks/useAuth";

export interface IProtectedRouteProps {
  redirectTo?: string;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  redirectTo = "/auth",
}) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn() ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
