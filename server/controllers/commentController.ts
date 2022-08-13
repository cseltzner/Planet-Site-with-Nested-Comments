import express from "express";
import { StatusCodes } from "http-status-codes";
import { Comment } from "../models/Comment";
import { Post } from "../models/Post";

export const addComment = async (
  req: express.Request,
  res: express.Response
) => {
  const body = req.body.body;
  const userId = req.userId?.id;
  const postId = req.params.postId;
  let post;

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

    const postWithComments = await Post.findOne({ _id: postId }).populate({
      path: "comments",
      model: "comment",
    });

    return res.json(postWithComments);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
