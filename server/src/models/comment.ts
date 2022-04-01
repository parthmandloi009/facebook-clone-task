import mongoose from "mongoose";

const comment = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
  },
  comment: {
    type: String,
  },
  postId: {
    type: mongoose.Types.ObjectId,
  },
  image: [
    {
      type: String,
    },
  ],
  userId: {
    type: mongoose.Types.ObjectId,
  },
  commentedBy: {
    type: mongoose.Types.ObjectId,
  },
});

const comments = mongoose.model("comment", comment);

export default comments;
