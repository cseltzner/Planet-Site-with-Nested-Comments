import mongoose, { Document } from "mongoose";

export interface UserInterface extends Document {
  username: String;
  email: String;
  password: String;
  favPlanet: Number;
}

const UserSchema = new mongoose.Schema<UserInterface>(
  {
    username: {
      type: String,
      required: true,
      minlength: 2,
      unique: true,
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
    favPlanet: {
      type: Number,
      required: true,
      min: 1,
      max: 9,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<UserInterface>("user", UserSchema);
