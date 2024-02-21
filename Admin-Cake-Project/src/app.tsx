import React, { useEffect } from "react";
import "./app.css";
import Routers from "./routers/routers.router";
// import { io, Socket } from "socket.io-client";
// import { useSelector } from "react-redux";
// const socket = io("http://localhost:9000");

function App() {
  // const update = useSelector((state: any) => state.update);
  // useEffect(() => {
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);
  return (
    <div className="App">
      <Routers />
    </div>
  );
}

export default App;
