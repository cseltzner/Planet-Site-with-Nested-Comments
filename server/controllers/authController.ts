import express from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const getAuthenticatedUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = req.userId?.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

// Authenticate a user and send back a toeken
export const authenticateUser = async (
  req: express.Request,
  res: express.Response
) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  // Check if either username or email were sent
  if (!username && !email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errors: "Please include an email or a username" });
  }

  // Check if password was sent
  if (!password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errors: "Please include a password" });
  }

  // If validation succeeds
  let user;

  // Get user by email
  if (email) {
    user = await User.findOne({ email: email });
  }

  // Get user by username if none are found by email
  if (!user) {
    user = await User.findOne({ username: username });
  }

  // If no user from email or username, credentials are invalid
  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errors: [{ msg: "Invalid credentials" }] });
  }

  // Compare passwords
  const passwordsMatch = await bcrypt.compare(
    password,
    user.password.toString()
  );

  // If password is incorrect
  if (!passwordsMatch) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errors: [{ msg: "Invalid credentials" }] });
  }

  // If all credentials valid, return jwt
  const payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7 days",
    },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );

  try {
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};
