import express, {Request, Response,  NextFunction } from "express";
import * as ProductController from "./product.controller";
import { validateRequest } from "../../common/middleware/validateRequest";
import { createProductSchema } from "./product.validation";
import { upload } from "../../common/middleware/upload";

const router = express.Router();

router.post(
  "/",
  upload.array("images", 5),
  
  ProductController.createProduct,
);
router.get("/", ProductController.getProducts);

export default router;
