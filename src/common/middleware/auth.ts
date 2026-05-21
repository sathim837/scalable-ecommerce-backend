import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { env } from "../../config/env";
import jwt from "jsonwebtoken";

export const auth =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError("Unauthorized", 401);
    }

    const decoded = jwt.verify(token, env.jwtAccessSecret) as {
      userId: string;
      role: string;
    };
    req.user = decoded;

    if (!decoded) {
      throw new AppError("Invalid token", 401);
    }

    if (roles.length && !roles.includes(decoded.role)) {
      throw new AppError("Forbidden", 403);
    }

    next();
  };
