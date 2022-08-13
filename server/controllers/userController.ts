import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
import { User } from "../models/User";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";
dotenv.config();

// Gets all users from DB
export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// Registers a user in the database
export const registerUser = async (
  req: express.Request,
  res: express.Response
) => {
  const {
    username,
    email,
    password,
    favPlanet = Math.floor(Math.random() * 9) + 1, // Sets random favPlanet if none were provided
  } = req.body;

  try {
    // Check if user exists
    const userWithUsername = await User.findOne({ username: username });
    if (userWithUsername) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: [{ msg: "This username is already taken" }],
      });
      return;
    }
    const userWithEmail = await User.findOne({ email: email });
    if (userWithEmail) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: [{ msg: "This email is already taken" }],
      });
      return;
    }

    // If validation succeeds
    const newUser = new User({
      username: username,
      email: email,
      password: password,
      favPlanet: favPlanet,
    });

    // Encrypt password
    const salt = await bcryptjs.genSalt(10);
    newUser.password = await bcryptjs.hash(password, salt);

    await newUser.save();

    // Return jsonwebtoken
    const payload = {
      user: {
        id: newUser.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7 days",
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};
