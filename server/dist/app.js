"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const routers_routers_1 = __importDefault(require("./routers/routers.routers"));
const index_entites_1 = __importDefault(require("./entities/index.entites"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const db_config_1 = __importDefault(require("./configs/db.config"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
dotenv.config();
const server = (0, express_1.default)();
server.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
    optionsSuccessStatus: 200,
}));
const app = http_1.default.createServer(server);
const io = new socket_io_1.Server(app, {
    cors: {
        origin: ['http://localhost:3000', "http://localhost:3001"]
    },
});
io.on('connection', (socket) => {
    console.log(socket.id, "socket id", 'Client connection');
    socket.on('blockUser', (id) => {
        io.emit('logout', id);
    });
    socket.on('createReview', (id) => {
        // console.log(id);
        io.emit('updateReview', id);
    });
    socket.on('statusPayment', (data) => {
        // console.log(data);
        io.emit('statusHistory', data);
    });
});
const port = process.env.PORT;
server.use(express_1.default.static("public"));
server.use(body_parser_1.default.json());
server.use(body_parser_1.default.urlencoded({ extended: true }));
server.use((0, cookie_parser_1.default)());
server.use((0, express_session_1.default)({
    secret: String(process.env.SS_SECRET),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));
db_config_1.default.authenticate();
(0, routers_routers_1.default)(server);
(0, index_entites_1.default)();
app.listen(port, () => console.log(`http://localhost:${port} SERVER OKK FEN`));
