import React from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layouts/defaultLayout";
import Home from "../components/home/home";
import Shop from "../components/shop/shop";
import Detail from "../components/detail/detail";
import Cart from "../components/cart/cart";
import Profiles from "../components/profiles/profiles";
import PrivateRouter from "./private.route";

const Routers = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout son={<Home />} />} />
        <Route path="/shop" element={<DefaultLayout son={<Shop />} />} />
        <Route
          path="/detail/:id"
          element={<DefaultLayout son={<Detail />} />}
        />
        <Route element={<PrivateRouter />}>
          <Route
            path="/users/:id/cart"
            element={<DefaultLayout son={<Cart />} />}
          />
          <Route
            path="/users/:id/profile"
            element={<DefaultLayout son={<Profiles />} />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default Routers;
