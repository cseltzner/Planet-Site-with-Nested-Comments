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
exports.addComment = void 0;
const http_status_codes_1 = require("http-status-codes");
const Comment_1 = require("../models/Comment");
const Post_1 = require("../models/Post");
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const body = req.body.body;
    const userId = (_a = req.userId) === null || _a === void 0 ? void 0 : _a.id;
    const postId = req.params.postId;
    let post;
    try {
        post = yield Post_1.Post.findOne({ _id: postId });
        if (!post) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "Invalid post Id" });
        }
        const newComment = new Comment_1.Comment({
            user: userId,
            body: body,
        });
        const savedComment = yield newComment.save();
        (_b = post.comments) === null || _b === void 0 ? void 0 : _b.unshift(savedComment.id);
        yield post.save();
        const postWithComments = yield Post_1.Post.findOne({ _id: postId }).populate({
            path: "comments",
            model: "comment",
        });
        return res.json(postWithComments);
    }
    catch (err) {
        console.log(err);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
});
exports.addComment = addComment;
