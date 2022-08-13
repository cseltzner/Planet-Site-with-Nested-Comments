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
exports.addReply = void 0;
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
        const parentComment = yield Comment_1.Comment.findById(commentId);
        if (!parentComment) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ msg: "Invalid Comment Id" });
        }
        const newReply = new ChildComment_1.ChildComment({
            user: userId,
            body: body,
        });
        const savedReply = yield newReply.save();
        console.log("SAVED REPLY");
        console.log("Here is the saved reply: " + savedReply);
        console.log("parent comment before: " + parentComment);
        (_b = parentComment.childComments) === null || _b === void 0 ? void 0 : _b.unshift(savedReply._id);
        console.log("UNSHIFTED");
        console.log("parent comment after: " + parentComment);
        yield parentComment.save();
        console.log("SAVED PARENT COMMENT");
        const postWithComments = yield Post_1.Post.findOne({ _id: postId }).populate(postPopulate_1.postPopulate);
        return res.json(postWithComments);
    }
    catch (err) {
        console.log(err);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
});
exports.addReply = addReply;
