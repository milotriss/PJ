import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";
import Routers from "./routers/routers.route";
// import useSocket from "./hooks/useSocket.hooks";
import UserService from "./services/users.service";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { notifyWarning } from "./common/toastify.common";

function App() {
  // const userService = new UserService();
  // const navigate = useNavigate();
  // const socket = useSocket();
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user") as string);
  //   socket.on("logout", async (id: any) => {
  //     if (id === user?.id) {
  //       await userService.logout();
  //       localStorage.removeItem("user");
  //       localStorage.removeItem("token");
  //       navigate("/");
  //       notifyWarning("Your account has been Blocked");
  //     }
  //   });
  //   socket.on("statusHistory", (data: any) => {
  //     if (data.userId === user?.id) {
  //       if (data.status === "1") {
  //         notifyWarning("Your Order has been Updated: Shipping...");
  //       } else if (data.status === "2") {
  //         notifyWarning("Your Order has been Updated: Finished");
  //       }
  //     }
  //   });
  // }, [socket]);
  return (
    <div className="App">
      <Routers />
      <ToastContainer />
    </div>
  );
}

export default App;
