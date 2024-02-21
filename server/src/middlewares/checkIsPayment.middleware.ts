import express, { NextFunction } from 'express';
import OrderItemService from '../services/orderItem.service';
import { IOrderItem } from '../types/emtities.types';
const orderItemService = new OrderItemService()
const checkIsPayment =async (req:express.Request, res:express.Response, next:NextFunction) => {
    try {
        const id = Number(req.params.id);
        const checkIsPayment:IOrderItem | undefined = await orderItemService.checkIsPayment(id);
        if (checkIsPayment) {
            next()
        }else {
            res.status(404).json("Not found")
        }
    } catch (error) {
        res.status(500).json("Check isPayment: Middleware")
    }
}
export default checkIsPayment