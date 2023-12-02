import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./auth.interface";

// User Schema
export const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, " Name Is Required"],
    },

    email: {
      type: String,
      required: [true, "Email Is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Email Is Required"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// User Model
export const User = model<IUser, UserModel>("User", UserSchema);
