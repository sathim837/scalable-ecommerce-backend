import mongoose from 'mongoose';
import {Cart} from '../cart/cart.model';
import {Order} from './order.model';
import { Product } from '../products/product.model';

export const createOrder = async(
    userId: string,
    payload: {
        shippingAddress: string;
    }
) => {
    try {
        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if(!cart || cart.items.length === 0) {
            throw new Error("Cart is empty");
        }

        for(const item of cart.items) {

            const product = await Product.findById(item.product._id);
            if(!product) {
                throw new Error(`Product not found`);
            }
            if(item.quantity > product.stock) {
                throw new Error(`Product ${product.name} is out of stock`);
            }
        }


        const orderItems = [];
        let totalPrice = 0;
        for(const item of cart.items) {
            const product = await Product.findById(item.product._id);

            if(!product) {
                continue;
            }
            if(product) {
                product.stock -= item.quantity;
                await product.save();
            }

            orderItems.push({
                product: item.product._id,
                name: product.name,
                quantity: item.quantity,
                price: product.price,
                subtotal: item.quantity * product.price,
            });
            totalPrice += item.quantity * product.price;
        }

        const order = new Order({
            user: new mongoose.Types.ObjectId(userId),
            items: orderItems,
            totalPrice: totalPrice,
            shippingAddress: payload.shippingAddress,
        });
        await order.save();
        await Cart.findOneAndDelete({ user: userId });
        return order;

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error("Failed to create order: " + message);
    }
}

export const getUserOrders = async(userId: string) => {
    try {
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
        return orders;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error("Failed to get user orders: " + message);
    }
}