import mongoose, { Document } from "mongoose";

export interface UserInterface extends Document {
  name: String;
  email: String;
  password: String;
}

const UserSchema = new mongoose.Schema<UserInterface>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S\S+$/],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserInterface>("user", UserSchema);
module.exports = User;
