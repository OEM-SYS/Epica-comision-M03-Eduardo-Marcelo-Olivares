//se importa solamente lo necesario de mongoose
import {Schema, model} from "mongoose";
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.ObjectId, ref: "User",
    }
   
    ,
    comments: [
      { 
        type: Schema.ObjectId, ref: "Comment",
      }
    ],
    imageURL: {
        type: String,
        required: true,
      },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    updatedAt: {
        type: Date,
        default: Date.now,
      },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/*
 author: {
      type: String,
      required: true,
      trim: true,
    }
*/
//este modelo se utiliza en XXXXXXXXXXXX.js
export default model("Post", postSchema);