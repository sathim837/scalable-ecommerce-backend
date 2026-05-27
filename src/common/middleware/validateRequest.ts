import { NextFunction, Request, Response } from "express";

import { ZodError } from "zod";

export const validateRequest =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("REQ BODY BEFORE VALIDATION:", req.body);
      console.log("REQ FILES:", req.files);

      const validatedData = await schema.parseAsync({
        body: req.body,
      });

      console.log({validatedData});
      // Object.assign(req.body, validatedData.body);
      req.body = validatedData.body;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log("ZOD ERRORS:", JSON.stringify(error.issues, null, 2));

        return res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: error.issues,
        });
      }

      next(error);
    }
  };
