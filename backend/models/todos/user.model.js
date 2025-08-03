import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "name is re  required"],
      unique: [true, "name already use"],
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "email is re  required"],
      unique: [true, "email already use"],
      lowecase: true,
      trim: true,
    },
    avatar: {
      type: String, // cloudinary url
      // required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);

export default User;
