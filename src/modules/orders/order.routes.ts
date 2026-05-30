import express from 'express';
import * as orderController from './order.controller';
import {auth } from "../../common/middleware/auth";

const router = express.Router();

router.use(auth("user"));

router.post('/', auth("user") , orderController.createOrder);
router.get('/user', auth("user"), orderController.getUserOrders);

export default router;