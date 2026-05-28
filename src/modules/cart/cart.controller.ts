import {Request, Response} from "express";
import {addToCartSchema} from "./cart.validation";   
import * as CartService from "./cart.service";
import {catchAsync} from "../../common/utils/catchAsync";

export const addToCart = catchAsync(
    async (req: Request, res: Response) => {
  
    const userId = req.user ?.userId as string;
        console.log({userId, body: req.body});
    
    const cart = await CartService.addToCart(userId, req.body);
    res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      data: cart,
    });
});

export const getCart = catchAsync(
    async (req: Request, res: Response) => {
    const userId = req.user ?.userId as string;

    const cart = await CartService.getCart(userId); 
    res.status(200).json({
      success: true,
      message: "Cart retrieved successfully",
      data: cart,
    });
});
