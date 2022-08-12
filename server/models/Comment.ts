import mongoose from "mongoose";
import { UserInterface } from "./User";

export interface CommentInterface extends mongoose.Document {
  user: UserInterface["_id"];
  body: String;
  childComments: {
    user: UserInterface["_id"];
    body: String;
  }[];
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
  },
  childComments: [
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
      },
    },
  ],
});

export const Comment = mongoose.model<CommentInterface>(
  "comment",
  CommentSchema
);
