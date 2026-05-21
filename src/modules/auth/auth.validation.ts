import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(6),
  }),
});

export const registerValidationSchema = z.object({
  body: z.object({
    name: z.string(),

    email: z.email(),

    password: z.string().min(6),
  }),
});
