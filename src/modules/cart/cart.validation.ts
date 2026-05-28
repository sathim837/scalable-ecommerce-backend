import { z } from "zod";

export const addToCartSchema = z.object({
  body: z.object({
    products: z.array(
      z.object({
        productId: z.string().min(1, "Product ID is required"),
        quantity: z.number().int().positive("Quantity must be a positive integer"),
      }),
    ),
  }),
});
