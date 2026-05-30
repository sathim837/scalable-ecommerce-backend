import {Request, Response} from "express";
import {catchAsync} from '../../common/utils/catchAsync';
import { createOrderSchema } from "./order.validation";
import * as orderService from "./order.service"; 

export const createOrder = catchAsync(
    async(
        req: Request, res: Response
    ) => {
        const userId = req.user?.userId as string;

    const { body: shippingAddress } = createOrderSchema.parse(req);

    const order = await orderService.createOrder(userId, shippingAddress);

    res.status(201).json({
        status: "success",
        message: "Order created successfully",
        data: { order }
    });
});

export const getUserOrders = catchAsync(
    async(
        req: Request, res: Response
    ) => {
        const userId = req.user?.userId as string;  
        const orders = await orderService.getUserOrders(userId);
        res.status(200).json({
            status: "success",
            message: "User orders retrieved successfully",
            data: { orders }
        });
    }
);  