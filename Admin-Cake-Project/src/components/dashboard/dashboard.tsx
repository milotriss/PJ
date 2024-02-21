import React, { useEffect, useMemo, useState } from "react";
import "./dashboard.css";
import { FaUserFriends } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { LuClipboardEdit } from "react-icons/lu";
import { SlSocialDropbox } from "react-icons/sl";
import { useLocation } from "react-router-dom";
import { notifySuccess, notifyWarning } from "../../common/toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { PieChart } from "@mui/x-charts/PieChart";
import ProductService from "../../services/products.service";
import { LineChart } from "@mui/x-charts/LineChart";
import UserService from "../../services/users.service";
import OrderService from "../../services/orders.service";
import { formatPrice } from "../../common/formatPrice";
import Loading from "../loanding/loading";

const Dashboard = (): JSX.Element => {
  const location: any = useLocation();
  const [isLoading,setIsLoading] = useState<boolean>(true)
  const admin = JSON.parse(localStorage.getItem("admin") as string);
  useEffect(() => {
    if (location.state === "login") {
      if (admin.role === 1) {
        notifySuccess(`Welcome to! ${admin.fullName}`);
      } else if (admin.role === 0) {
        notifySuccess(`Welcome to! Presidents`);
      }
    }
  }, [location.pathname]);
  // Get all data
  // Get all Products
  const [products, setProducts] = useState<any[]>([]);
  const productService = new ProductService();
  const getAllProducts = async () => {
    const result = await productService.getAllProducts();
    if (result === 2) {
      notifyWarning("Get products failed");
    } else {
      setProducts(result);
    }
  };
  // Get All Users
  const [users, setUsers] = useState<any[]>([]);
  
  const userService = new UserService();
  const getAllUsers = async () => {
    const result = await userService.getAllUsers();
    if (result === 2) {
      notifyWarning("Get users failed");
    } else {
      setUsers(result);
    }
  };
  // Get All Orders
  const [orders, setOrders] = useState<any[]>([]);
  const orderService = new OrderService();
  const getAllOrders = async () => {
    const result = await orderService.getAllOrders();
    if (result === 2) {
      notifyWarning("Get users failed");
    } else {
      setOrders(result);
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllUsers();
    getAllOrders();
    setIsLoading(false);
  }, []);
  const [revenue, setRevenue] = useState<number>(0);
  useMemo(() => {
    const result = orders.reduce(
      (init: number, item: any) => init + item.lastPrice,
      0
    );
    setRevenue(result);
  }, [orders]);
  const [cake, setCake] = useState<number>(0);
  const [bread, setBread] = useState<number>(0);
  const [burger, setBurger] = useState<number>(0);
  const [cookie, setCookie] = useState<number>(0);
  const [donut, setDonut] = useState<number>(0);
  const [pie, setPie] = useState<number>(0);
  useMemo(() => {
    const cakeArr = products.filter((item: any) => item.catalogId === 1);
    const breadArr = products.filter((item: any) => item.catalogId === 2);
    const burgerArr = products.filter((item: any) => item.catalogId === 3);
    const cookieArr = products.filter((item: any) => item.catalogId === 4);
    const donutArr = products.filter((item: any) => item.catalogId === 5);
    const pieArr = products.filter((item: any) => item.catalogId === 6);
    const cakeAndDesert = products.reduce((init: number, item: any) => {
      if (item.catalogId === 1) {
        init += item.stock;
      }
      return init;
    }, 0);
    const bread = products.reduce((init: number, item: any) => {
      if (item.catalogId === 2) {
        init += item.stock;
      }
      return init;
    }, 0);
    const burgerAndPizza = products.reduce((init: number, item: any) => {
      if (item.catalogId === 3) {
        init += item.stock;
      }
      return init;
    }, 0);
    const cookieAndBiscuit = products.reduce((init: number, item: any) => {
      if (item.catalogId === 4) {
        init += item.stock;
      }
      return init;
    }, 0);
    const Donut = products.reduce((init: number, item: any) => {
      if (item.catalogId === 5) {
        init += item.stock;
      }
      return init;
    }, 0);
    const pieAndTart = products.reduce((init: number, item: any) => {
      if (item.catalogId === 6) {
        init += item.stock;
      }
      return init;
    }, 0);
    setCake(cakeAndDesert / cakeArr.length);
    setBread(bread / breadArr.length);
    setBurger(burgerAndPizza / burgerArr.length);
    setCookie(cookieAndBiscuit / cookieArr.length);
    setDonut(Donut / donutArr.length);
    setPie(pieAndTart / pieArr.length);
  }, [products]);

  return (
    <section className="dashboard">
      {isLoading && <Loading/>}
      <h1>Dashboard</h1>
      <h2>Statistics</h2>
      <div className="dashboardGrid">
        <div className="dashboardUsers dashboardItems">
          <div className="dashboardUsersInfo">
            <div className="text">
              <p>Total Users</p>
              <span>{users.length} Users</span>
            </div>
            <FaUserFriends className="iconDashboard" />
          </div>
          <div className="mountain"></div>
        </div>
        <div className="dashboardRevenue dashboardItems">
          <div className="dashboardRevenueInfo">
            <div className="text">
              <p>Total Revenue</p>
              <span>{formatPrice(revenue)}</span>
            </div>
            <GiTakeMyMoney className="iconDashboard" />
          </div>
          <div className="mountain"></div>
        </div>
        <div className="dashboardProducts dashboardItems">
          <div className="dashboardProductsInfo">
            <div className="text">
              <p>Total Products</p>
              <span>{products.length} Products</span>
            </div>
            <SlSocialDropbox className="iconDashboard" />
          </div>
          <div className="mountain"></div>
        </div>
        <div className="dashboardOrders dashboardItems">
          <div className="dashboardOrdersInfo">
            <div className="text">
              <p>Total Orders</p>
              <span>{orders.length} Orders</span>
            </div>
            <LuClipboardEdit className="iconDashboard" />
          </div>
          <div className="mountain"></div>
        </div>
      </div>
      <div className="dashboardChart">
        <div className="dashboardProductsChart">
          <h2>Products Chart</h2>
          <PieChart
            
            series={[
              {
                data: [
                  {
                    id: 1,
                    value: Math.ceil(100 - (cake / 999) * 100),
                    label: "Cake & Desert",
                  },
                  {
                    id: 2,
                    value: Math.ceil(100 - (bread / 999) * 100),
                    label: "Bread",
                  },
                  {
                    id: 3,
                    value: Math.ceil(100 - (burger / 999) * 100),
                    label: "Burger & Pizza",
                  },
                  {
                    id: 4,
                    value: Math.ceil(100 - (cookie / 999) * 100),
                    label: "Cookie & Biscuit",
                  },
                  {
                    id: 5,
                    value: Math.ceil(100 - (donut / 999) * 100),
                    label: "Donut",
                  },
                  {
                    id: 6,
                    value: Math.ceil(100 - (pie / 999) * 100),
                    label: "Pie & Tart",
                  },
                ],
                innerRadius: 50,
                outerRadius: 150,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -180,
                endAngle: 180,
                cx: 180,
                cy: 200,
              },
            ]}
          />
        </div>
        <div className="dashboardRevenueChart">
          <h2>Products Chart</h2>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
            series={[
              {
                data: [2, 5, 2.2, 5.5, 1.5, 5, 6, 9, 4.5, 3, 9, 9],
              },
            ]}
            width={1200}
            height={600}
          />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Dashboard;
