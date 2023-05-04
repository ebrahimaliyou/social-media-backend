import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    location: String,
    description: String,
    userPicturePath: { type: String, default: "" },
    picturePath: { type: String, default: "" },
    likes: { type: Map, of: Boolean },
    comments: { type: Array, default: [] },
  },
  { timestamps: true }
);

const post = mongoose.model("Post", PostSchema);

export default post;
