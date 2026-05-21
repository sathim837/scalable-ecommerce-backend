import express from "express";
import * as AuthController from "./auth.controller";
import { validateRequest } from "../../common/middleware/validateRequest";
import {
  loginSchema,
  registerValidationSchema,
} from "./auth.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(registerValidationSchema),
  AuthController.register,
);


router.post(
  "/signup",
  validateRequest(registerValidationSchema),
  AuthController.signup,
);

router.post(
  "/login",
  validateRequest(loginSchema),
  AuthController.login,
);

export default router;