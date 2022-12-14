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

    await newPost.save();
    await getAllPosts(req, res, planetId);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    return;
  }
};

// Get all posts for a specific planet
export const getAllPosts = async (
  req: express.Request,
  res: express.Response,
  planet?: Number
) => {
  let planetId = planet;
  // Check to make sure planetId is a number
  try {
    // Use http params if planet not passed as argument
    if (!planet) {
      planetId = Number(req.params.planetId);
    }
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send("planetId must be a number");
  }
  try {
    const posts = await Post.find({ planet: planetId })
      .sort({ updatedAt: -1 })
      .populate(postPopulate)
      .populate("user", "username")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          model: "user",
          select: "username favPlanet",
        },
      })
      .populate({
        path: "comments",
        populate: {
          path: "childComments",
          model: "childcomment",
          populate: {
            path: "user",
            model: "user",
            select: "username favPlanet",
          },
        },
      });
    return res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    return;
  }
};

// Get post
export const getPost = async (req: express.Request, res: express.Response) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId)
      .sort({ updatedAt: -1 })
      .populate(postPopulate)
      .populate({
        path: "comments",
        populate: {
          path: "user",
          model: "user",
          select: "username favPlanet",
        },
      })
      .populate({
        path: "comments.childComments",
        populate: {
          path: "user",
          model: "user",
          select: "username favPlanet",
        },
      })
      .populate({
        path: "comments",
        populate: {
          path: "childComments",
          model: "childcomment",
          populate: {
            path: "user",
            model: "user",
            select: "username favPlanet",
          },
        },
      })
      .populate({
        path: "user",
        model: "user",
        select: "username",
      });
    return res.json(post);
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
    await post.save();
    await getAllPosts(req, res, post.planet);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    return;
  }
};

// Delete post
export const deletePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = req.userId?.id;
    const postId = req.params.postId;

    if (postId.length !== 24) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid Post Id" });
    }

    const post = await Post.findById(postId);

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

    const planetId = post?.planet;
    await Post.findByIdAndDelete(postId);

    // Return updated post list
    getAllPosts(req, res, planetId);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    return;
  }
};

// Like a post
export const likePost = async (req: express.Request, res: express.Response) => {
  try {
    const userId = req.userId?.id;
    const postId = req.params.postId;

    if (postId.length !== 24) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid Post Id" });
    }

    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid post Id" });
    }

    // Check if post has already been liked by this user
    if (
      post.likes &&
      post.likes?.filter((like) => like.user.toString() === userId).length > 0
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Post already liked" });
    }

    post.likes?.push({ user: userId });

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    return;
  }
};

// Unlike a post
export const unlikePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = req.userId?.id;
    const postId = req.params.postId;

    if (postId.length !== 24) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid Post Id" });
    }

    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid post Id" });
    }

    // Check if post has already been liked by this user
    if (
      post.likes &&
      post.likes?.filter((like) => like.user.toString() === userId).length === 0
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Post has not been liked by this user" });
    }

    const newLikes = post.likes?.filter(
      (like) => like.user.toString() !== userId
    );

    post.likes = newLikes;

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    return;
  }
};
