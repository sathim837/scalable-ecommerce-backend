import jwt from "jsonwebtoken";
import { env } from "../../config/env";

export const generateAccessToken = (
  payload: object,
): string => {
  return jwt.sign(payload, env.jwtAccessSecret, {
    expiresIn: "300m",
  });
};

export const generateRefreshToken = (
  payload: object,
): string => {
  return jwt.sign(payload, env.jwtRefreshSecret, {
    expiresIn: "7d",
  });
};