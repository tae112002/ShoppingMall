import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute({ isAdmin }) {
  return isAdmin ? (
    <Outlet />
  ) : (
    <>
      {window.alert("관리자 권한이 필요한 페이지입니다.")}
      <Navigate to="/" />
    </>
  );
}

export default AdminRoute;
