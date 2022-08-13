import express, { Router } from "express";
import { check, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import {
  addReply,
  deleteReply,
  editReply,
} from "../controllers/childCommentController";
import { authMiddleware } from "../middleware/auth";
const router = Router();

// @route   POST api/posts/comments/reply/:postId/:commentId
// @desc    Create a reply to a comment
// @access  Private
// @body    body:String
router.post(
  "/reply/:postId/:commentId",
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
    await addReply(req, res);
  }
);

// @route   PUT api/posts/comments/reply/:postId/:replyId
// @desc    Edit a reply to a comment
// @access  Private
// @body    body:String
router.put(
  "/reply/:postId/:replyId",
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
    await editReply(req, res);
  }
);

// @route   DELETE api/posts/comments/reply/:postId/:replyId
// @desc    Delete a reply to a comment
// @access  Private
router.delete(
  "/reply/:postId/:replyId",
  authMiddleware,
  async (req: express.Request, res: express.Response) => {
    await deleteReply(req, res);
  }
);

export default router;
