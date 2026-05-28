import mongoose from 'mongoose';
import { Wishlist } from './wishlist.model';

export const createWishlist = async (
    userId: string,
    productId: string
) => {
    const wishlist = await Wishlist.findOneAndUpdate(
        { user: userId },
        { $addToSet: { products: new mongoose.Types.ObjectId(productId) } },
        { new: true, upsert: true }
    );
    return wishlist;
}   

export const getWishlistByUserId = async (userId: string) => {
    return await Wishlist.findOne({ user: userId }).populate('products');
}