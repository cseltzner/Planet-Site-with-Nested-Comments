import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
dotenv.config();

export const authMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({
        msg: "Token must be sent in the Authorization header with Bearer",
      });
  }

  // Verify token
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    req.userId = decodedToken.user;
    next();
  } catch (err) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authorization token not valid" });
  }
};
