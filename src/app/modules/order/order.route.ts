import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

//create order route
router.post('/create-order', OrderControllers.createOrder);

//create get products route
router.get('/', OrderControllers.getOrders);

export const OrderRoutes = router;
