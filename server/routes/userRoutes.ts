import express, { Router } from "express";
import { check, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { getAllUsers, registerUser } from "../controllers/userController";
const router = Router();

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get("/", async (req, res) => {
  await getAllUsers(req, res);
});

// @route   POST api/users
// @desc    Register User
// @access  Public
// @body    username:String , email:String , password:String, favPlanet:Number? (from 1 to 9)
router.post(
  "/",
  [
    check("username", "Username must be at least 2 characters long").isLength({
      min: 2,
    }),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],

  async (req: express.Request, res: express.Response) => {
    // If validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    // If validation succeeds
    await registerUser(req, res);
  }
);

export default router;
