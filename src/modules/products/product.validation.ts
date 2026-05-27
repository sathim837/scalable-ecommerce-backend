import mongoose from "mongoose";
import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(100),

    price: z.coerce.number().min(0),

    slug: z.string(),

    description: z.string().trim().min(10),

    // category: z.string(),
    // category: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    //   message: "Invalid category id",
    // }),

    stock: z.coerce.number().min(0),

    averageRating: z.coerce.number().min(0).max(5).default(0),

    // images: z.array(z.string()).optional().default([]),

    isDeleted: z.coerce.boolean().default(false),
  }),
});
