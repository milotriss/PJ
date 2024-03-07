"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const events_service_1 = __importDefault(require("../services/events.service"));
const eventController = express_1.default.Router();
const eventService = new events_service_1.default();
eventController
    // Create New Event
    .post("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.id);
        const data = {
            userId,
            typePayment: req.body.typePayment,
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phone: Number(req.body.phone),
            receiveAt: req.body.receiveAt,
        };
        yield eventService.createEvent(data);
        res.status(201).json("Create Event Success");
    }
    catch (error) {
        res.status(500).json("Create Event: SERVER");
    }
}))
    .patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const updateData = {
            price: Number(req.body.price),
            status: Number(req.body.status),
        };
        yield eventService.updateEvent(id, updateData);
        res.status(200).json("Update Event Success");
    }
    catch (error) {
        console.log(error);
        res.status(500).json("Update Event: SERVER");
    }
}))
    .delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        yield eventService.deleteEvent(id);
        res.status(204).json("Delete Event Success");
    }
    catch (error) {
        res.status(500).json("Delete Event: SERVER");
    }
}));
exports.default = eventController;
