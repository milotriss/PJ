import express from "express";
import { IOrderDetailByUser, IOrderItemSend } from "../types/emtities.types";
import OrderItemService from "../services/orderItem.service";
import checkIsPayment from "../middlewares/checkIsPayment.middleware";
import { Authorization } from "../middlewares/auth.middleware";

const orderItemService = new OrderItemService();
const orderItemController = express.Router();

orderItemController
  // CreateOrderItem
  .post("/create", Authorization,async (req: express.Request, res: express.Response) => {
    try {
      const data: IOrderItemSend = {
        userId: Number(req.body.userId),
        productId: Number(req.body.productId),
        quantity: Number(req.body.quantity),
      };
      const result = await orderItemService.createOrderItem(data);
      if (result === 1) {
        res.status(201).json("Created OrderItem successfully");
      } else if (result === 2) {
        res.status(404).json("Product not found");
      }
    } catch (error) {
      res.status(500).json("Create OrderItem: SERVER");
    }
  })
  //   GetAllOrderItem
  .get("/" ,async (req: express.Request, res: express.Response) => {
    try {
      const data = await orderItemService.getAllOrderItems();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json("Get all OrderItem: SERVER");
    }
  })
  .get('/cart/:id',Authorization, async (req: express.Request, res: express.Response)=> {
    try {
      const userId = Number(req.params.id);
      const data = await orderItemService.getDetailOrderItemByUserBefore(userId)
      res.status(200).json(data[0])
    } catch (error) {
      res.status(500).json("Get Cart: SERVER")
    }
  })
  //   GetDetail with User
  .get(
    "/history/detail/:id",Authorization,
    async (req: express.Request, res: express.Response) => {
      try {
        const userId = Number(req.params.id);
        const codePayment = String(req.query.code);
        const data = await orderItemService.getHistoryDetail(
          userId,
          codePayment
        );
        console.log(data);
        
        res.status(200).json(data);
      } catch (error) {
        console.log(error);

        res.status(500).json("Get HistoryDetail: SERVER");
      }
    }
  )
  //   DeleteOrderItem
  .delete(
    "/:id",Authorization,
    checkIsPayment,
    async (req: express.Request, res: express.Response) => {
      try {
        const id = Number(req.params.id);
        await orderItemService.deleteOrderItem(id);
        res.status(204).json("Delete OrderItem Success");
      } catch (error) {
        res.status(500).json("Delete OrderItem: SERVER");
      }
    }
  )
  // Update OrderItem
  .patch(
    "/:id",Authorization,
    checkIsPayment,
    async (req: express.Request, res: express.Response) => {
      try {
        const id = Number(req.params.id);
        const newQuantity = Number(req.body.quantity);
        const newTotalPrice = Number(req.body.newTotalPrice);
        await orderItemService.updateOrderItem(id, newQuantity,newTotalPrice);
        res.status(204).json("Update OrderItem Success");
      } catch (error) {
        res.status(500).json("Update OrderItem: SERVER");
      }
    }
  );

export default orderItemController;
