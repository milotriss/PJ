import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  let checkLogin = localStorage.getItem("token") as string;
  return checkLogin ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRouter;