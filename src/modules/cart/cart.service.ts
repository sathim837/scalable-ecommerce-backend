import mongoose from "mongoose";
import { Cart } from "./cart.model";
import { Product } from "../products/product.model";
import { AppError } from "../../common/errors/AppError";

export const addToCart = async (
  userId: string,
  payload: {
    products: {
      productId: string;
      quantity: number;
    }[];
  },
) => {
  //   const session = await mongoose.startSession();

  //   session.startTransaction();
  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create(
        [
          {
            user: userId,
            items: [],
          },
        ],
        // { session },
      ).then((res) => res[0]);
    }

    if (!cart) {
      throw new AppError("Cart initialization failed", 500);
    }
    for (const item of payload.products) {
        
      const product = await Product.findById(item.productId);
      if (!product || product.isDeleted) {
        throw new AppError("Product not found", 404);
      }

      if (item.quantity > product.stock) {
        throw new AppError("Out of stock", 400);
      }

      const existingItem = cart.items.find(
        (cartItem) => cartItem.product.toString() === item.productId,
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
        existingItem.subtotal = existingItem.quantity * existingItem.price;
      } else {
        cart.items.push({
          product: new mongoose.Types.ObjectId(item.productId),

          quantity: item.quantity,

          price: product.price,

          subtotal: product.price * item.quantity,
        });
      }
    }

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.subtotal,
      0,
    );

    // await cart.save({ session });
    await cart.save();
    // await session.commitTransaction();

    return cart;
  } catch (error) {
    // await session.abortTransaction();

    throw error;
  } finally {
    // session.endSession();
  }
};

export const getCart = async (userId: string) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart) {
    throw new AppError("Cart not found", 404);
  }
  return cart;
};
