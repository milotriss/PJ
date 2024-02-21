import React, { useEffect, useMemo, useState } from "react";
import "./header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiPaperBagOpen } from "react-icons/gi";
import { TiArrowSortedDown } from "react-icons/ti";
import Login from "../login/login";
import UserService from "../../services/users.service";
import OrderItemService from "../../services/orderItems.service";
import { useSelector } from "react-redux";
import { ICart } from "../../types/entities.types";
import Loading from "../loanding/loading";
const Header = (): JSX.Element => {
  const [onLogin, setOnLogin] = useState<boolean>(false);
  const [sup, setSup] = useState<boolean>(false);
  const [info, setUserInfo] = useState<any>();
  const [carts, setCart] = useState<ICart[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const updateCart = useSelector((state: any) => state.updateCart);
  const scrollHeight = 1200;
  const orderItemService = new OrderItemService();
  const userService = new UserService();
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user") as string;
  const user = JSON.parse(userString);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  const autoLogin = () => {
    if (!token && location.pathname === "/") {
      setOnLogin(true);
    }
  };
  const handleHeader = () => {
    const headerElement = document.querySelector(".header") as HTMLElement;
    if (location.pathname !== "/") {
      headerElement.classList.add("activeHeader");
    } else {
      headerElement.classList.remove("activeHeader");
    }
  };
  const classifyHeader = () => {
    const aElement: any = document.querySelectorAll(".hiddenHref");
    aElement.forEach((element: any) => {
      if (location.pathname !== "/") {
        element.classList.add("activeHiddenHref");
      } else {
        element.classList.remove("activeHiddenHref");
      }
    });
  };
  useEffect(() => {
    const handleScroll = () => {
      const headerElement = document.querySelector(".header") as HTMLElement;
      const scrollY = window.scrollY;
      if (scrollY > scrollHeight) {
        headerElement.classList.add("activeHeader");
      } else {
        headerElement.classList.remove("activeHeader");
      }
    };
    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }
    autoLogin();
    handleHeader();
    classifyHeader();
  }, [location.pathname]);

  const offLogin = (): void => {
    setOnLogin(false);
  };
  // Đăng xuất
  const handleLogout = async () => {
    setIsLoading(true);
    await userService.logout();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setSup(!sup);
    setIsLoading(false);
    navigate("/", { state: "logout" });
  };
  // Lấy thông tin render
  const updateProfiles = useSelector((state: any) => state.updateProfile);
  useEffect(() => {
    const getUserInfo = async () => {
      setIsLoading(true);
      const data = await userService.getUserInfo(user?.id);
      // console.log(data);
      setUserInfo(data);
      setIsLoading(false);
    };
    if (token) {
      getUserInfo();
    }
    // return () => {
    //   setUserInfo(undefined);
    // }
  }, [updateProfiles]);

  // Cart
  useEffect(() => {
    const getCart = async () => {
      setIsLoading(true);
      const data = await orderItemService.getCart(Number(user?.id));
      setCart(data);
      setIsLoading(false);
    };
    if (token) {
      getCart();
    }
  }, [updateCart, location.pathname]);

  return (
    <header className="header">
      {isLoading && <Loading />}
      {onLogin ? <Login offLogin={offLogin} /> : null}
      <Link to={"/"}>
        <span>Huong </span>Bakery
      </Link>
      <ul className="navigate">
        <Link to={"/"}>Home</Link>
        <Link to={"/shop"}>Shop</Link>
        <a className="hiddenHref" href="#catalog">
          Catalog
        </a>
        <a className="hiddenHref" href="#about">
          About
        </a>
        <a className="hiddenHref" href="#contact">
          Contact
        </a>
        <a className="hiddenHref" href="#event">
          Event
        </a>
        <a className="hiddenHref" href="#workshop">
          Work Shop
        </a>
      </ul>
      {!token ? (
        <div className="headerLogin">
          <button onClick={() => setOnLogin(true)} className="btnLogin">
            Login
          </button>
        </div>
      ) : (
        <div className="headerLogout">
          <div className="headerCart">
            <Link to={"/users/:id/cart"}>
              <GiPaperBagOpen className="iconCart" />
            </Link>
            <div className="textCart">
              <span className="headerSeparate"></span>
              <p>{carts.length}</p>
            </div>
          </div>
          <div className="headerProfile">
            <img src={info?.userInfo?.avatar} alt="" />
            <p>Hi, {user.lastName}</p>
            <span className="pointHeader">{info?.point.point} P</span>
            <TiArrowSortedDown
              onClick={() => setSup(!sup)}
              className="iconSup"
            />
            {sup ? (
              <div className="headerSup">
                <Link
                  onClick={() => setSup(!sup)}
                  to={`/users/${user?.id}/profile`}
                >
                  Profile
                </Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
