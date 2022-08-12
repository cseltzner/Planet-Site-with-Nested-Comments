import mongoose, { Document, Schema } from "mongoose";
import { CommentInterface } from "./Comment";
import { UserInterface } from "./User";

export interface PostInterface extends Document {
  user: UserInterface["_id"];
  title: String;
  body: String;
  likes: UserInterface["_id"][];
  comments: CommentInterface["_id"][];
}

const PostSchema: Schema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment", // Don't forget to call .populate on the find method!
      },
    ],
  },
  { timestamps: true }
);

export const Post = mongoose.model<PostInterface>("post", PostSchema);
