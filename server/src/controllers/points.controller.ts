import express from 'express'
import PointService from '../services/points.service';
import { Authorization } from '../middlewares/auth.middleware';
const pointController = express.Router();
const pointService = new PointService();

pointController
// Get Point By UserId
.get('/:id',Authorization,async (req:express.Request, res:express.Response)=> {
    try {
        const userId = Number(req.params.id)
        const data = await pointService.getByUserId(userId)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json('Get Point: SERVER')
    }
})
.patch('/:id', async (req:express.Request, res:express.Response)=> {
    try {
        const userId = Number(req.params.id)
        const point = Number(req.body.point)
        await pointService.updateNewPoint(userId,point)
        res.status(200).json('Update Point Success')
    } catch (error) {
        res.status(500).json('Update Point: SERVER')
    }
})
export default pointController;