import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoute({ isLogin }) {
  return !isLogin ? <Outlet /> : <Navigate to="/" />;
}

export default PublicRoute;
