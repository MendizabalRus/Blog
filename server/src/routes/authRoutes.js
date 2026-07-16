import Router from "express";
import { register, login, getCurrentUser } from "../controllers/authControllers.js";

const authRoutes = Router();

authRoutes.get("/me", getCurrentUser)
authRoutes.post("/register", register);
authRoutes.post("/login", login);

export default authRoutes;
