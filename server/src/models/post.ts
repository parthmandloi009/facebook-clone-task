import mongoose from "mongoose";

const post = new mongoose.Schema(
  {
    id: {
      type: mongoose.Types.ObjectId,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: [
      {
        type: String,
      },
    ],
    userId: {
      type: String,
      required: true,
    },
    like: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const posts = mongoose.model("post", post);

export default posts;
