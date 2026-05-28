import express from "express";
import * as CartController from "./cart.controller";
import { validateRequest } from "../../common/middleware/validateRequest";
import { addToCartSchema } from "./cart.validation";  
import {auth } from "../../common/middleware/auth";

const router = express.Router();

router.post(
  "/add",
  auth("user"),
  validateRequest(addToCartSchema),
  CartController.addToCart,
);
router.get(
  "/",
  auth("user"),
  CartController.getCart,
);

export default router;