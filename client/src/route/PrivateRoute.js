import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ isLogin }) {
  return isLogin ? (
    <Outlet />
  ) : (
    <>
      {window.alert("로그인이 필요한 페이지입니다.")}
      <Navigate to="/login" />;
    </>
  );
}

export default PrivateRoute;
