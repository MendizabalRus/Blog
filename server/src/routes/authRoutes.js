import Router from "express";
import {
  register,
  login,
  getCurrentUser,
  adminLogin,
} from "../controllers/authControllers.js";
import { authenticateJWT } from "../middleware/authenticateJWT.js";

const authRoutes = Router();

authRoutes.get("/me", authenticateJWT, getCurrentUser);
authRoutes.post("/register", register);
authRoutes.post("/login", login);

authRoutes.post("/admin/login", adminLogin);

export default authRoutes;
