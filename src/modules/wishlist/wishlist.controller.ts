import { Request, Response } from "express";
import * as WishlistService from "./wishlist.service";
import { catchAsync } from "../../common/utils/catchAsync";

export const addToWishlist = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const { productId } = req.body;
  const wishlist = await WishlistService.createWishlist(userId, productId);
  res
    .status(200)
    .json({
      success: true,
      message: "Product added to wishlist",
      data: wishlist,
    });
});

export const getWishlist = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const wishlist = await WishlistService.getWishlistByUserId(userId);
  res
    .status(200)
    .json({ success: true, message: "Wishlist retrieved", data: wishlist });
});
