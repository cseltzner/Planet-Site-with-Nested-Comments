import express, { Router } from "express";
import { check, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import {
  addComment,
  deleteComment,
  editComment,
} from "../controllers/commentController";
import { authMiddleware } from "../middleware/auth";
const router = Router();

// @route POST api/posts/comments/:postId
// @desc Create a comment
// @access Private
// @body body:String
router.post(
  "/:postId",
  [
    authMiddleware,
    check("body", "Comment body must not be empty").not().isEmpty(),
    check("body", "Comments must be less than 3000 characters long").isLength({
      max: 3000,
    }),
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    await addComment(req, res);
  }
);

// @route PUT api/posts/comments/:postId/:commentId
// @desc Edit a comment
// @access Private
// @body body:String
router.put(
  "/:postId/:commentId",
  [
    authMiddleware,
    check("body", "Comment body must not be empty").not().isEmpty(),
    check("body", "Comments must be less than 3000 characters long").isLength({
      max: 3000,
    }),
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    await editComment(req, res);
  }
);

// @route DELETE api/posts/comments/:postId/:commentId
// @desc Delete a comment
// @access Private
router.delete(
  "/:postId/:commentId",
  authMiddleware,
  async (req: express.Request, res: express.Response) => {
    await deleteComment(req, res);
  }
);

export default router;
