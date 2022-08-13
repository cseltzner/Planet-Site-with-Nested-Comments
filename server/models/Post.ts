import mongoose, { Document, Schema } from "mongoose";
import { CommentInterface } from "./Comment";
import { UserInterface } from "./User";

export interface PostInterface extends Document {
  user: UserInterface["_id"];
  title: String;
  body: String;
  planet: Number;
  likes?: UserInterface["_id"][];
  comments?: CommentInterface["_id"][];
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
      maxlength: 300,
      minlength: 1,
    },
    body: {
      type: String,
      required: true,
      maxlength: 5000,
      minlength: 1,
    },
    planet: {
      type: Number,
      required: true,
      min: 1,
      max: 9,
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
