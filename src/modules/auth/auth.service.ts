import bcrypt from "bcrypt";
import { User } from "../users/user.model";
import { AppError } from "../../common/errors/AppError";
import { generateAccessToken, generateRefreshToken } from "./auth.utils";

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const existingUser = await User.findOne({
    email: payload.email,
  });

  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(
    payload.password,
    10,
  );

  const user = await User.create({
    ...payload,
    password: hashedPassword,
  });

  return user;
};



export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({
    email: payload.email,
  }).select("+password");

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new AppError("Invalid credentials", 401);
  }

  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = generateAccessToken(jwtPayload);

  const refreshToken =
    generateRefreshToken(jwtPayload);

  return {
    accessToken,
    refreshToken,
  };
};