import React from "react";
import { Route, Routes } from "react-router-dom";

import DefaultLayout from "../layouts/defaultLayout/defaultLayout";

import PrivateRouter from "./private.router";
import Dashboard from "../components/dashboard/dashboard";
import Users from "../components/users/users";
import Products from "../components/products/products";
import Orders from "../components/orders/orders";
import Login from "../components/login/login";
import ForbiddenLayout from "../layouts/forbiddentLayout/forbiddentLayout";

const Routers = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route element={<PrivateRouter />}>
          <Route>
            <Route path="/dashboard" element={<DefaultLayout son={<Dashboard />} />} />
            <Route path="/user" element={<DefaultLayout son={<Users />} />} />
            <Route
              path="/product"
              element={<DefaultLayout son={<Products />} />}
            />
            <Route path="/order" element={<DefaultLayout son={<Orders />} />} />
          </Route>
        </Route>
        <Route path="*" element={<ForbiddenLayout/>} />
      </Routes>
    </>
  );
};

export default Routers;
