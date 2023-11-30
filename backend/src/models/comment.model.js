//se importa solamente lo necesario de mongoose
import {Schema, model} from "mongoose";
const commentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId, 
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    post: {
      type: Schema.Types.ObjectId, 
      ref: "Post",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);
//este modelo se utiliza en XXXXXXXXXXXX.js
export default model("Comment", commentSchema);