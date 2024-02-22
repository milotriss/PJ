import express from 'express';
import { IPayment } from '../types/emtities.types';
import PaymentService from '../services/payment.service';
import {v1 as uuidv1} from 'uuid'
import { Authorization } from '../middlewares/auth.middleware';
const paymentService = new PaymentService()
const paymentController = express.Router();
paymentController
// Create New Payment
.post('/:id',Authorization, async (req:express.Request, res:express.Response) => {
    try {
        const userId = Number(req.params.id)
        const code = uuidv1()
        const data:IPayment = {
            userId,
            subTotal: req.body.subTotal,
            typePayment: Number(req.body.typePayment),
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            lastPrice: req.body.lastPrice,
            codePayment: code
        }
        const point = Number(req.body.point)
        await paymentService.createPayment(data,code,point)
        res.status(201).json("Payment created");
    } catch (error) {
        console.log(error)
        res.status(500).json('Payment: SERVER')
    }
})
// Update Status Payment
.patch('/update/:id',Authorization, async (req:express.Request, res:express.Response) => {
    try {
        const id = Number(req.params.id);
        const status = Number(req.body.status);
        const result = await paymentService.updatePayment(id,status)
        if (result[0] === 0) {
            res.status(404).json('Not Found')
        }else {
            res.status(200).json('Updated Status Successfully')
        }
    } catch (error) {
        res.status(500).json('Payment update: SERVER')
    }
})
// Get All Payment
.get('/', Authorization,async (req:express.Request, res:express.Response) => {
    try {
        const data = await paymentService.getAllPayments()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json('Payment GetAll: SERVER')
    }
})
// Search Payments
.get('/search/:id', Authorization,async (req:express.Request, res:express.Response) => {
    try {
        const searchValue = String(req.query.search)
        const id = Number(req.params.id)
        const data = await paymentService.searchPayments(searchValue,id)
        res.status(200).json(data[0])
    } catch (error) {
        res.status(500).json('Payment search: SERVER')
    }
})
.get('/search', async (req:express.Request, res:express.Response) => {
    try {
        const searchValue = String(req.query.search)
        const data = await paymentService.searchPayments(searchValue)
        res.status(200).json(data[0])
    } catch (error) {
        res.status(500).json('Payment search: SERVER')
    }
})

export default paymentController;