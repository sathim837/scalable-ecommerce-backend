import express from "express";
import * as WishlistController from "./wishlist.controller";
import {auth} from "../../common/middleware/auth";

const router = express.Router();

router.post("/add", auth("user"), WishlistController.addToWishlist);
router.get("/", auth("user"), WishlistController.getWishlist);

export default router;