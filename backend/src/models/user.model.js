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
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
/*roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],*/
//este modelo se utiliza en src/controllers/auth.controllers.js
export default model("User", userSchema);