//se importa solamente lo necesario de mongoose
import {Schema, model} from "mongoose";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
//este modelo se utiliza en XXXXXXXXXXXX.js
export default model("User", userSchema);