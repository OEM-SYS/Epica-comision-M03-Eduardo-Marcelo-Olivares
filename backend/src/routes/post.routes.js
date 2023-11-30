import { Router } from "express";
import { authRequired } from "../middlewares/auth.jwt.js";
import {getAllPost, getAllPostByUser , getPostByID, createPost, updatePost, deletePost } from "../controllers/post.controller.js";

//router se utilizara en src/app.js con un alias  as postRouter
export const router = Router();

router.get("/post/", getAllPost);
router.get("/postUser/", authRequired, getAllPostByUser);
router.get("/post/:id", getPostByID);
router.post("/post/", authRequired, createPost);
router.put("/post/:id", authRequired, updatePost);
router.delete("/post/:id", authRequired, deletePost);