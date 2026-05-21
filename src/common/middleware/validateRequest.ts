import { AnyZodObject } from "zod";
import { NextFunction, Request, Response } from "express";

export const validateRequest =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
      });

      next();
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.errors,
      });
    }
  };