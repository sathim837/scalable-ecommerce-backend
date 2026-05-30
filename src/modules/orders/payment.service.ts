import { Order } from "./order.model";
import { AppError } from "../../common/errors/AppError";

export const mockPayment = async(
    orderId: string
) => {
    const order = await Order.findById(orderId);
    if(!order)
    {
        throw new AppError("No order found", 404);
    }

    order.status = "paid";
    order.paymentStatus = "paid";

    await order.save();

    return order;
}