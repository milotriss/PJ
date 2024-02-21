import express from "express";
import EventService from "../services/events.service";
import { IEvent } from "../types/emtities.types";

const eventController = express.Router();
const eventService = new EventService();

eventController
  // Create New Event
  .post("/:id", async (req: express.Request, res: express.Response) => {
    try {
      const userId = Number(req.params.id);
      const data: IEvent = {
        userId,
        typePayment: req.body.typePayment,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: Number(req.body.phone),
        receiveAt: req.body.receiveAt,
      };
      await eventService.createEvent(data);
      res.status(201).json("Create Event Success");
    } catch (error) {
      res.status(500).json("Create Event: SERVER");
    }
  })
  .patch("/:id", async (req: express.Request, res: express.Response) => {
    try {
      const id = Number(req.params.id);
      const updateData = {
        price: Number(req.body.price),
        status: Number(req.body.status),
      };
      await eventService.updateEvent(id, updateData);
      res.status(200).json("Update Event Success");
    } catch (error) {
      console.log(error);

      res.status(500).json("Update Event: SERVER");
    }
  })
  .delete('/:id', async (req:express.Request, res:express.Response)=> {
    try {
      const id = Number(req.params.id);
      await eventService.deleteEvent(id);
      res.status(204).json("Delete Event Success");
    } catch (error) {
      res.status(500).json("Delete Event: SERVER");
    }
  })

export default eventController;
