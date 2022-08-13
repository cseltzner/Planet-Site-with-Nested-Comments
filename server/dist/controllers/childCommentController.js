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
exports.editReply = exports.addReply = void 0;
const http_status_codes_1 = require("http-status-codes");
const Post_1 = require("../models/Post");
const ChildComment_1 = require("../models/ChildComment");
const Comment_1 = require("../models/Comment");
const postPopulate_1 = require("./postPopulate");
// Reply to a comment
const addReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const body = req.body.body;
    const userId = (_a = req.userId) === null || _a === void 0 ? void 0 : _a.id;
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    if (postId.length !== 24) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: "Invalid Post Id" });
    }
    if (commentId.length !== 24) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ msg: "Invalid Comment Id" });
    }
    try {
        // Check for existing post
        const post = yield Post_1.Post.findOne({ _id: postId });
        if (!post) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "Invalid post Id" });
        }
        // Check for existing parent comment
        const parentComment = yield Comment_1.Comment.findById(commentId);
        if (!parentComment) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "Invalid Comment Id" });
        }
        const newReply = new ChildComment_1.ChildComment({
            user: userId,
            parentComment: commentId,
            body: body,
        });
        const savedReply = yield newReply.save();
        (_b = parentComment.childComments) === null || _b === void 0 ? void 0 : _b.unshift(savedReply._id);
        yield parentComment.save();
        const postWithComments = yield Post_1.Post.findOne({ _id: postId }).populate(postPopulate_1.postPopulate);
        return res.json(postWithComments);
    }
    catch (err) {
        console.log(err);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
});
exports.addReply = addReply;
// Edit a reply
const editReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const userId = (_c = req.userId) === null || _c === void 0 ? void 0 : _c.id;
    const replyId = req.params.replyId;
    const postId = req.params.postId;
    if (postId.length !== 24) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: "Invalid Post Id" });
    }
    console.log(replyId);
    if (replyId.length !== 24) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ msg: "Invalid Comment Id" });
    }
    try {
        // Check for existing post
        const post = yield Post_1.Post.findOne({ _id: postId });
        if (!post) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "Invalid post Id" });
        }
        console.log("reply id: " + replyId);
        const reply = yield ChildComment_1.ChildComment.findById(replyId);
        // Check for existing reply
        if (!reply) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "Invalid reply Id" });
        }
        // Check if reply's parent comment is in the post
        console.log("post.comments: " + post.comments);
        console.log("reply.parentComment: " + (reply === null || reply === void 0 ? void 0 : reply.parentComment));
        if (!((_d = post.comments) === null || _d === void 0 ? void 0 : _d.find((comment) => {
            return comment._id.toString() == (reply === null || reply === void 0 ? void 0 : reply.parentComment.toString());
        }))) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "Reply does not exist on the post specified" });
        }
        // Check that user owns the comment
        if (reply.user.toString() !== userId) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "You cannot edit someone else's comment!" });
        }
        // Validation success
        const updatedReplyBody = req.body.body;
        reply.body = updatedReplyBody;
        reply.save();
        const postWithComments = yield Post_1.Post.findOne({ _id: postId }).populate(postPopulate_1.postPopulate);
        return res.json(postWithComments);
    }
    catch (err) {
        console.log(err);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
});
exports.editReply = editReply;
