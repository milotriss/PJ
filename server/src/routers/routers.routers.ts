import {Express} from 'express';
import userController from '../controllers/users.controller';
import productsController from '../controllers/products.controller';
import orderItemController from '../controllers/orderItem.controller';
import paymentController from '../controllers/payment.controller';
import feedbackController from '../controllers/feedback.controller';
import eventController from '../controllers/events.controller';
import pointController from '../controllers/points.controller';
import rateController from '../controllers/rates.controller';
import adminController from '../controllers/admin.controller';

const routers = (server:Express) =>{
    server.use('/users',userController)
    server.use('/products',productsController)
    server.use('/order-items',orderItemController)
    server.use('/payments',paymentController)
    server.use('/feedbacks',feedbackController)
    server.use('/events',eventController)
    server.use('/points',pointController)
    server.use('/rates',rateController)
    server.use('/admin',adminController)
}

export default routers;