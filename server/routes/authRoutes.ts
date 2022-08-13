import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {
  authenticateUser,
  getAuthenticatedUser,
} from "../controllers/authController";
import { authMiddleware } from "../middleware/auth";
const router = Router();

// @route   GET api/auth
// @desc    Get authenticated user
// @access  Private
router.get("/", authMiddleware, async (req, res) => {
  getAuthenticatedUser(req, res);
});

// @route   POST api/auth
// @desc    Authenticate user and send back token
// @access  Public
// @body    (email:String OR username:String), password:String
router.post("/", async (req, res) => {
  authenticateUser(req, res);
});

// @route   DELETE api/auth/enticate
// @desc    Does nothing useful
// @access  Public, a route for the whole world to see and access
router.delete("/enticate", (req, res) => {
  res.status(StatusCodes.IM_A_TEAPOT).send("Hello there");
});

export default router;
