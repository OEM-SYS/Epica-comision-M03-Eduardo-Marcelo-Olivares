import { Router } from "express";
import { authRequired } from "../middlewares/auth.jwt.js";
import { createComment, deleteComment, getAllComment, getCommentByID, updateComment } from "../controllers/coment.controller.js";


//router se utilizara en src/app.js con un alias  as commentRouter
export const router = Router();

router.get("/comment/", getAllComment);
router.get("/comment/:id", getCommentByID);
router.post("/comment/:postId", authRequired, createComment);
router.put("/comment/:id", authRequired, updateComment);
router.delete("/comment/:id", authRequired, deleteComment);