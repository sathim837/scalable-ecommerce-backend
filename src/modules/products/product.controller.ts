import {Request, Response} from 'express';
import * as ProductService from './product.service';   
import {catchAsync} from '../../common/utils/catchAsync';
import { logger } from '../../config/logger';


export const createProduct = catchAsync(
   
      async (req: Request, res: Response) => {
          
    const files = req.files as Express.Multer.File[] || [];

    const imagePaths = files.map(
      (file) => file.path,
    );

    const payload = {
      ...req.body,
      images: imagePaths,
    };

      console.log("PAYLOAD:", payload);

    const result =
      await ProductService.createProduct(
        payload,
      );
      console.log({result});
    res.status(201).json({
      success: true,
      message:
        "Product created successfully",
      data: result,
    });
  },
);

export const getProducts = catchAsync(async (req: Request, res: Response) => {
  const products = await ProductService.getProducts(req.query);
  res.status(200).json({    
    success: true,
    message: 'Products retrieved successfully',
    data: products,
  });
})
