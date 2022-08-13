import mongoose from "mongoose";
import { ChildCommentInterface } from "./ChildComment";
import { UserInterface } from "./User";

export interface CommentInterface extends mongoose.Document {
  user: UserInterface["_id"];
  body: String;
  childComments?: ChildCommentInterface["_id"][];
}

const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
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
        type: mongoose.Types.ObjectId,
        ref: "childcomment",
      },
    },
  ],
});

export const Comment = mongoose.model<CommentInterface>(
  "comment",
  CommentSchema
);
