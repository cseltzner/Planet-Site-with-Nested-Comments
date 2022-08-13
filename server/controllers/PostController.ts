import express from "express";
import { BAD_REQUEST, StatusCodes } from "http-status-codes";
import { Post } from "../models/Post";
import { postPopulate } from "./postPopulate";

// Create a post
export const createPost = async (
  req: express.Request,
  res: express.Response
) => {
  const { title, body } = req.body;
  const userId = req.userId?.id;
  let planetId;

  // Check if planetId is a number
  try {
    planetId = Number(req.params.planetId);
    if (planetId < 1 || planetId > 9) throw new Error();
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send("planetId must be a valid number");
    return;
  }

  try {
    const newPost = new Post({
      user: userId,
      title: title,
      body: body,
      planet: planetId,
    });

    const post = await newPost.save();

    return res.json(post);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    return;
  }
};

// Get all posts
export const getAllPosts = async (
  req: express.Request,
  res: express.Response
) => {
  let planetId;
  try {
    planetId = Number(req.params.planetId);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send("planetId must be a number");
  }
  try {
    const posts = await Post.find({ planet: planetId })
      .sort({ date: -1 })
      .populate(postPopulate);
    return res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    return;
  }
};

// Edit post
export const editPost = async (req: express.Request, res: express.Response) => {
  try {
    const userId = req.userId?.id;
    const postId = req.params.postId;
    const body = req.body.body;

    if (postId.length !== 24) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid Post Id" });
    }

    const post = await Post.findById(postId).populate(postPopulate);

    // Check if the post exists
    if (!post) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid post Id" });
    }

    // Check that user owns the post
    if (post.user.toString() !== userId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "You cannot edit someone else's post!" });
    }

    post.body = body;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    return;
  }
};
