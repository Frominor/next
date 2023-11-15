import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    authorName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// export default mongoose.model("User", userSchema);
export default mongoose.models.Post || mongoose.model("Post", PostSchema);
