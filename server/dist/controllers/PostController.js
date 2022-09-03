"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlikePost = exports.likePost = exports.deletePost = exports.editPost = exports.getPost = exports.getAllPosts = exports.createPost = void 0;
const http_status_codes_1 = require("http-status-codes");
const Post_1 = require("../models/Post");
const postPopulate_1 = require("./postPopulate");
// Create a post
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, body } = req.body;
    const userId = (_a = req.userId) === null || _a === void 0 ? void 0 : _a.id;
    let planetId;
    // Check if planetId is a number
    try {
        planetId = Number(req.params.planetId);
        if (planetId < 1 || planetId > 9)
            throw new Error();
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send("planetId must be a valid number");
        return;
    }
    try {
        const newPost = new Post_1.Post({
            user: userId,
            title: title,
            body: body,
            planet: planetId,
        });
        yield newPost.save();
        yield (0, exports.getAllPosts)(req, res, planetId);
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        return;
    }
});
exports.createPost = createPost;
// Get all posts for a specific planet
const getAllPosts = (req, res, planet) => __awaiter(void 0, void 0, void 0, function* () {
    let planetId = planet;
    // Check to make sure planetId is a number
    try {
        // Use http params if planet not passed as argument
        if (!planet) {
            planetId = Number(req.params.planetId);
        }
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send("planetId must be a number");
    }
    try {
        const posts = yield Post_1.Post.find({ planet: planetId })
            .sort({ updatedAt: -1 })
            .populate(postPopulate_1.postPopulate)
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
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        return;
    }
});
exports.getAllPosts = getAllPosts;
// Get post
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    try {
        const post = yield Post_1.Post.findById(postId)
            .sort({ updatedAt: -1 })
            .populate(postPopulate_1.postPopulate)
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
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        return;
    }
});
exports.getPost = getPost;
// Edit post
const editPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = req.userId) === null || _b === void 0 ? void 0 : _b.id;
        const postId = req.params.postId;
        const body = req.body.body;
        if (postId.length !== 24) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "Invalid Post Id" });
        }
        const post = yield Post_1.Post.findById(postId).populate(postPopulate_1.postPopulate);
        // Check if the post exists
        if (!post) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "Invalid post Id" });
        }
        // Check that user owns the post
        if (post.user.toString() !== userId) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "You cannot edit someone else's post!" });
        }
        post.body = body;
        yield post.save();
        yield (0, exports.getAllPosts)(req, res, post.planet);
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        return;
    }
});
exports.editPost = editPost;
// Delete post
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const userId = (_c = req.userId) === null || _c === void 0 ? void 0 : _c.id;
        const postId = req.params.postId;
        if (postId.length !== 24) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "Invalid Post Id" });
        }
        const post = yield Post_1.Post.findById(postId);
        // Check if the post exists
        if (!post) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "Invalid post Id" });
        }
        // Check that user owns the post
        if (post.user.toString() !== userId) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "You cannot edit someone else's post!" });
        }
        const planetId = post === null || post === void 0 ? void 0 : post.planet;
        yield Post_1.Post.findByIdAndDelete(postId);
        // Return updated post list
        (0, exports.getAllPosts)(req, res, planetId);
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        return;
    }
});
exports.deletePost = deletePost;
// Like a post
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const userId = (_d = req.userId) === null || _d === void 0 ? void 0 : _d.id;
        const postId = req.params.postId;
        if (postId.length !== 24) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "Invalid Post Id" });
        }
        const post = yield Post_1.Post.findById(postId);
        // Check if the post exists
        if (!post) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "Invalid post Id" });
        }
        // Check if post has already been liked by this user
        if (post.likes &&
            ((_e = post.likes) === null || _e === void 0 ? void 0 : _e.filter((like) => like.user.toString() === userId).length) > 0) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "Post already liked" });
        }
        (_f = post.likes) === null || _f === void 0 ? void 0 : _f.push({ user: userId });
        yield post.save();
        return res.json(post.likes);
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        return;
    }
});
exports.likePost = likePost;
// Unlike a post
const unlikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const userId = (_g = req.userId) === null || _g === void 0 ? void 0 : _g.id;
        const postId = req.params.postId;
        if (postId.length !== 24) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "Invalid Post Id" });
        }
        const post = yield Post_1.Post.findById(postId);
        // Check if the post exists
        if (!post) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "Invalid post Id" });
        }
        // Check if post has already been liked by this user
        if (post.likes &&
            ((_h = post.likes) === null || _h === void 0 ? void 0 : _h.filter((like) => like.user.toString() === userId).length) === 0) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "Post has not been liked by this user" });
        }
        const newLikes = (_j = post.likes) === null || _j === void 0 ? void 0 : _j.filter((like) => like.user.toString() !== userId);
        post.likes = newLikes;
        // // Get remove index
        // const removeIndex = post.likes
        //   ?.map((like) => like.user.toString())
        //   .indexOf(userId);
        // if (removeIndex) {
        //   post.likes?.splice(removeIndex, 1);
        // }
        yield post.save();
        return res.json(post.likes);
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        return;
    }
});
exports.unlikePost = unlikePost;
