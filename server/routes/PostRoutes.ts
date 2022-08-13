import express, { Router } from "express";
import { check, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
} from "../controllers/postController";
import { authMiddleware } from "../middleware/auth";
const router = Router();

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

// @route PUT api/posts/:postId
// @desc Edit post body
// @access Private
// @body body:String
router.put(
  "/:postId",
  [
    authMiddleware,
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
    await editPost(req, res);
  }
);

// @route DELETE api/posts/:postId
// @desc Delete post
// @access Private
router.delete(
  "/:postId",
  authMiddleware,

  async (req: express.Request, res: express.Response) => {
    await deletePost(req, res);
  }
);

export default router;
