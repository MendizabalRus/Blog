import Router from "express";
import { register, login, getCurrentUser, adminLogin } from "../controllers/authControllers.js";

const authRoutes = Router();

authRoutes.get("/me", getCurrentUser)
authRoutes.post("/register", register);
authRoutes.post("/login", login);

authRoutes.post("/admin/login", adminLogin)

export default authRoutes;
