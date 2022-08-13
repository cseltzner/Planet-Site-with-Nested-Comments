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
exports.editPost = exports.getAllPosts = exports.createPost = void 0;
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
        const post = yield newPost.save();
        return res.json(post);
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        return;
    }
});
exports.createPost = createPost;
// Get all posts
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let planetId;
    try {
        planetId = Number(req.params.planetId);
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send("planetId must be a number");
    }
    try {
        const posts = yield Post_1.Post.find({ planet: planetId })
            .sort({ date: -1 })
            .populate(postPopulate_1.postPopulate);
        return res.json(posts);
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        return;
    }
});
exports.getAllPosts = getAllPosts;
// Edit post
const editPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = req.userId) === null || _b === void 0 ? void 0 : _b.id;
        const postId = req.params.postId;
        const body = req.body.body;
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
        const updatedPost = yield post.save();
        res.json(updatedPost);
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        return;
    }
});
exports.editPost = editPost;
