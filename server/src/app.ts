import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import routers from "./routers/routers.routers";
import createEntity from "./entities/index.entites";
import cookieParser from "cookie-parser";
import session from "express-session";
import sequelize from "./configs/db.config";
import { Server, Socket } from "socket.io";
import https from "https";

dotenv.config();
const server = express();
server.use(
  cors({
    origin: "https://huongbakery-cake.vercel.app",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
// const app = https.createServer(server);
// const io = new Server(app, {
//   cors: {
//     origin: "https://huongbakery-cake.vercel.app",
//   },
// });
// io.on("connection", (socket: Socket) => {
//   console.log(socket.id, "socket id", "Client connection");
//   socket.on("blockUser", (id: number) => {
//     io.emit("logout", id);
//   });
//   socket.on("createReview", (id: number) => {
//     // console.log(id);
//     io.emit("updateReview", id);
//   });
//   socket.on("statusPayment", (data: any) => {
//     // console.log(data);
//     io.emit("statusHistory", data);
//   });
// });
const port = process.env.PORT;
server.use(express.static("public"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(
  session({
    secret: String(process.env.SS_SECRET),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
sequelize.authenticate();
routers(server);
// createEntity()
server.listen(port, () => console.log(`http://localhost:${port} SERVER OKK FEN`));
