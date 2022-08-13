"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ChildCommentSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
exports.Comment = mongoose_1.default.model("childcomment", ChildCommentSchema);
