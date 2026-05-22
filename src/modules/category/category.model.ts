import mongoose from "mongoose";

export interface ICategory {
  name: string;
  slug: string;
  isActive: boolean;
}

const categorySchema = new mongoose.Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
);

export const Category = mongoose.model<ICategory>("Category", categorySchema);