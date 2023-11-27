//se importa solamente lo necesario de mongoose
import {Schema, model} from "mongoose";
const commentSchema = new Schema(
  {
    author: {
        type: String,
        required: true,
        trim: true,
      },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    versionKey: false,
  }
);
//este modelo se utiliza en XXXXXXXXXXXX.js
export default model("Comment", commentSchema);