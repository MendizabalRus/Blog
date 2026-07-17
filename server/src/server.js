import path from "node:path";
import express from "express";
import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import postsRoutes from "./routes/postsRoutes.js";

const app = express();

// CORS config.
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Authenitcation related petitions
app.use("/api/auth", authRoutes);

// Posts related petittions
app.use("/api/posts", postsRoutes);

app.listen(8080, (err) => {
  if (err) throw err;
  console.log("\x1b[36m", "Server initialised - http://localhost:8080");
});
