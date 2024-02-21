import express from 'express'
import RateService from '../services/rates.service';
import { IRate } from '../types/emtities.types';

const rateController = express.Router()
const rateService = new RateService()

rateController
// Create new Rate
.post('/:id', async (req: express.Request, res: express.Response)=>{
    try {
        const userId = Number(req.params.id);
        const data:IRate = {
            userId,
            productId: req.body.productId,
            rateStar: Number(req.body.rateStar),
            review: req.body.review,
        }
        await rateService.createRate(data)
        res.status(201).json("Rate created");
    } catch (error) {
        res.status(500).json('Create Rate: SERVER')
    }
})
// Delete Rate
.delete('/:id', async (req: express.Request, res:express.Response)=>{
    try {
        const rateId = Number(req.params.id);
        const result = await rateService.deleteRate(rateId)
        if (result) {
            res.status(204).json("Rate deleted");
        }else {
            res.status(404).json("Rate not found");
        }
    } catch (error) {
        res.status(500).json('Delete Rate: SERVER')
    }
})
// Get All Rate
.get('/all/:id', async (req: express.Request, res:express.Response)=> {
    try {
        const result = await rateService.getAllRates()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json('Get Rate: SERVER')
    }
})
// Get rate by product
.get('/:id', async (req: express.Request, res:express.Response)=>{
    try {
        const productId = Number(req.params.id);
        const result = await rateService.getRateById(productId)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json('Get Rate: SERVER')
    }
})
export default rateController;