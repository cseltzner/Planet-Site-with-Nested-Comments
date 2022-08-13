import express from "express";
import { StatusCodes } from "http-status-codes";
import { Post, PostInterface } from "../models/Post";
import { ChildComment } from "../models/ChildComment";
import { Comment } from "../models/Comment";
import { postPopulate } from "./postPopulate";

// Reply to a comment
export const addReply = async (req: express.Request, res: express.Response) => {
  const body = req.body.body;
  const userId = req.userId?.id;
  const postId = req.params.postId;
  const commentId = req.params.commentId;

  if (postId.length !== 24) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid Post Id" });
  }
  if (commentId.length !== 24) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Invalid Comment Id" });
  }

  try {
    // Check for existing post
    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid post Id" });
    }
    // Check for existing parent comment
    const parentComment = await Comment.findById(commentId);
    if (!parentComment) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid Comment Id" });
    }

    const newReply = new ChildComment({
      user: userId,
      parentComment: commentId,
      body: body,
    });

    const savedReply = await newReply.save();
    parentComment.childComments?.unshift(savedReply._id);
    await parentComment.save();

    const postWithComments = await Post.findOne({ _id: postId }).populate(
      postPopulate
    );

    return res.json(postWithComments);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// Edit a reply
export const editReply = async (
  req: express.Request,
  res: express.Response
) => {
  const userId = req.userId?.id;
  const replyId = req.params.replyId;
  const postId = req.params.postId;

  if (postId.length !== 24) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid Post Id" });
  }

  if (replyId.length !== 24) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Invalid Comment Id" });
  }

  try {
    // Check for existing post
    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid post Id" });
    }
    const reply = await ChildComment.findById(replyId);

    // Check for existing reply
    if (!reply) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid reply Id" });
    }

    // Check if reply's parent comment is in the post
    if (
      !post.comments?.find((comment) => {
        return comment._id.toString() == reply?.parentComment.toString();
      })
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Reply does not exist on the post specified" });
    }

    // Check that user owns the comment
    if (reply.user.toString() !== userId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "You cannot edit someone else's comment!" });
    }

    // Validation success
    const updatedReplyBody = req.body.body;
    reply.body = updatedReplyBody;
    reply.save();

    const postWithComments = await Post.findOne({ _id: postId }).populate(
      postPopulate
    );

    return res.json(postWithComments);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
