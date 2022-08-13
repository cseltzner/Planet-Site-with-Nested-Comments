import express from "express";
import { StatusCodes } from "http-status-codes";
import { Post } from "../models/Post";
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
    const parentComment = await Comment.findById(commentId);
    if (!parentComment) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid Comment Id" });
    }

    const newReply = new ChildComment({
      user: userId,
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
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
