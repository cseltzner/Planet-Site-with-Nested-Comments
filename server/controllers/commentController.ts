import express from "express";
import { StatusCodes } from "http-status-codes";
import { Comment } from "../models/Comment";
import { Post } from "../models/Post";
import { postPopulate } from "./postPopulate";

// Add comment
export const addComment = async (
  req: express.Request,
  res: express.Response
) => {
  const body = req.body.body;
  const userId = req.userId?.id;
  const postId = req.params.postId;
  let post;

  if (postId.length !== 24) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid Post Id" });
  }

  try {
    post = await Post.findOne({ _id: postId });
    if (!post) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid post Id" });
    }

    const newComment = new Comment({
      user: userId,
      body: body,
    });

    const savedComment = await newComment.save();
    post.comments?.unshift(savedComment.id);
    await post.save();

    const postWithComments = await Post.findOne({ _id: postId }).populate(
      postPopulate
    );

    return res.json(postWithComments);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// Edit comment
export const editComment = async (
  req: express.Request,
  res: express.Response
) => {
  const userId = req.userId?.id;
  const commentId = req.params.commentId;
  const postId = req.params.postId;

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

    // Check for existing comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid comment Id" });
    }

    // Check that user owns the comment
    if (comment.user.toString() !== userId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "You cannot edit someone else's comment!" });
    }

    // Validation success
    const updatedCommentBody = req.body.body;
    comment.body = updatedCommentBody;
    comment.save();

    const postWithComments = await Post.findOne({ _id: postId }).populate(
      postPopulate
    );

    return res.json(postWithComments);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
