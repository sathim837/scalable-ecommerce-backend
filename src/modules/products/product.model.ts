import mongoose, { Schema } from "mongoose";

export interface IProduct {
  name: string;
  price: number;
  slug: string;
  description: string;
  category: mongoose.Types.ObjectId;
  stock: number;
  averageRating: number;
  images: string[];
  isDeleted: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    stock: { type: Number, required: true, min: 0 },
    averageRating: { type: Number, default: 0 },
    images: {
      type: [String],
      default: [],
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

productSchema.index({ name: "text", description: "text" });

export const Product = mongoose.model<IProduct>("Product", productSchema);
