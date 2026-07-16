import Router from "express";
import { register, login } from "../controllers/authControllers.js";
const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);

export default authRoutes;
