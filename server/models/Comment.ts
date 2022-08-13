import mongoose, { Schema } from "mongoose";
import { ChildCommentInterface } from "./ChildComment";
import { PostInterface } from "./Post";
import { UserInterface } from "./User";

export interface CommentInterface extends mongoose.Document {
  user: UserInterface["_id"];
  parentPost: PostInterface["_id"];
  body: String;
  childComments?: ChildCommentInterface["_id"][];
}

const CommentSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  parentPost: {
    type: Schema.Types.ObjectId,
    ref: "post",
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
      type: Schema.Types.ObjectId,
      ref: "childcomment",
    },
  ],
});

export const Comment = mongoose.model<CommentInterface>(
  "comment",
  CommentSchema
);
