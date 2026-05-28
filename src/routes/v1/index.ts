import express from "express";
import authRoutes from "../../modules/auth/auth.routes";
import categoryRoutes from "../../modules/category/category.routes";
import productRoutes from "../../modules/products/product.routes";
import cartRoutes from "../../modules/cart/cart.routes";
import wishlistRoutes from "../../modules/wishlist/wishlist.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/categories",
    route: categoryRoutes,
  },
  {
    path: "/products",
    route: productRoutes,
  },
  {
    path: "/cart",
    route: cartRoutes,
  },
  {
    path: "/wishlist",
    route: wishlistRoutes,
  },
];

moduleRoutes.forEach((route) =>
  router.use(route.path, route.route),
);

export default router;