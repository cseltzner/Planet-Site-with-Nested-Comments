import mongoose from "mongoose";
import { UserInterface } from "./User";

export interface ChildCommentInterface extends mongoose.Document {
  user: UserInterface["_id"];
  body: String;
}

const ChildCommentSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

export const Comment = mongoose.model<ChildCommentInterface>(
  "childcomment",
  ChildCommentSchema
);
