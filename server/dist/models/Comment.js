"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CommentSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "user",
        required: true,
    },
    body: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 3000,
    },
    childComments: [
        {
            childComment: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "childcomment",
            },
        },
    ],
});
exports.Comment = mongoose_1.default.model("comment", CommentSchema);
