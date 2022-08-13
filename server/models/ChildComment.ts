import mongoose, { Schema } from "mongoose";
import { CommentInterface } from "./Comment";
import { UserInterface } from "./User";

export interface ChildCommentInterface extends mongoose.Document {
  user: UserInterface["_id"];
  parentComment: CommentInterface["_id"];
  body: String;
}

const ChildCommentSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "comment",
      required: true,
    },
    body: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 3000,
    },
  },
  {
    timestamps: true,
  }
);

export const ChildComment = mongoose.model<ChildCommentInterface>(
  "childcomment",
  ChildCommentSchema
);
