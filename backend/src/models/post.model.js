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
      type: Schema.Types.ObjectId, 
      ref: "User",
      required: true,
    },
    comments: [
      { 
        idComment:{
          type: Schema.Types.ObjectId, 
          ref: "Comment",
        }//aqui establecemos la relacion con el modelo Comment
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

//este modelo se utiliza en src/controllers/post.controller.js
export default model("Post", postSchema);
/*
comments: [
  { 
    idComment:{
      type: Schema.Types.ObjectId, 
      ref: "Comment",
    }//aqui establecemos la relacion con el modelo Comment
  }
]
*/