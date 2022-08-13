import express, { Router } from "express";
import { check, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { createPost, getAllPosts } from "../controllers/postController";
import { authMiddleware } from "../middleware/auth";
const router = Router();

// @route GET api/posts/:planet
// @desc Get all posts
// @access Public
router.get("/", async (req, res) => {
  // @todo get all posts
});

// @route POST api/posts/:planetId (eg. Planet 1 = Mercury)
// @desc Create a post
// @access Private
// @body title:String, body:String
router.post(
  "/:planetId", // planetId: Number(1 through 9)
  [
    authMiddleware,
    check("title", "Posts must contain a title").not().isEmpty(),
    check("title", "Title must be less than 300 characters").isLength({
      max: 300,
    }),
    check("body", "Post body must not be empty").not().isEmpty(),
    check("body", "Post body must be less than 5000 characters").isLength({
      max: 5000,
    }),
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }
    await createPost(req, res);
  }
);

// @route GET api/posts/:planetId (eg. Planet 1 = Mercury)
// @desc Get all posts for a planet
// @access Public
router.get(
  "/:planetId",
  async (req: express.Request, res: express.Response) => {
    await getAllPosts(req, res);
  }
);

export default router;
