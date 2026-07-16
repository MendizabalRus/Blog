import { Router } from "express";
import authenticateJWT from "../middleware/authenticateJWT";
import authorizeAdmin from "../middleware/authorizeAdmin";
import {
  getAllPublishedPosts,
  getPost,
  getComments,
  postComment,
  patchComment,
  deleteComment,
  getAllPosts,
  createPost,
  patchPost,
  patchTogglePublish,
  deletePost,
} from "../controllers/postsControllers.js";

const postsRoutes = Router();

// User routes
postsRoutes.get("/published", getAllPublishedPosts);
postsRoutes.get("/:postId", getPost);
postsRoutes.get("/:postId/comments", getComments);
postsRoutes.post("/:postId/comments", authenticateJWT, postComment);
postsRoutes.patch("/:postId/comments/:commentId", authenticateJWT, patchComment) // if user === owner
postsRoutes.delete("/:postId/comments/:commentId", authenticateJWT, deleteComment) // if user === admin || user === onwer

// Admin routes
postsRoutes.get("/", authenticateJWT, authorizeAdmin, getAllPosts);
postsRoutes.post("/create", authenticateJWT, authorizeAdmin, createPost);
postsRoutes.patch("/:postId", authenticateJWT, authorizeAdmin, patchPost);
postsRoutes.patch("/:postId/publish", authenticateJWT, authorizeAdmin, patchTogglePublish);
postsRoutes.delete("/:postId", authenticateJWT, authorizeAdmin, deletePost);

export default postsRoutes;
