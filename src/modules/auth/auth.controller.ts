import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../common/utils/catchAsync";
import * as AuthService from "./auth.service";

export const register = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AuthService.registerUser(
      req.body,
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  },
);

export const signup = (req: Request, res: Response, next: NextFunction) => {
    return register(req, res, next);
}

export const login = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AuthService.loginUser(
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  },
);