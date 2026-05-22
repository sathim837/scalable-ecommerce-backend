import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../common/utils/catchAsync";
import * as CategoryService from "./category.service";
import { logger } from "../../config/logger";

export const createCategory = catchAsync(
  async (req: Request, res: Response) => {
    
    const result = await CategoryService.createCategory(req.body);
    
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  },
);

export const getCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getCategories();
  res.status(200).json({
    success: true,
    message: "Categories fetched successfully",
    data: result,
  });
});
