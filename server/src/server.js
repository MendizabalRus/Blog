import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import postsRoutes from "./routes/postsRoutes.js";

const app = express();

// CORS config.
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Web admin
      "http://localhost:5174", // Web user
    ],
    credentials: true,
  }),
);

// Parse json
app.use(express.json())

// Authenitcation related petitions
app.use("/api/auth", authRoutes);

// Posts related petittions
app.use("/api/posts", postsRoutes);

app.listen(8080, (err) => {
  if (err) throw err;
  console.log("\x1b[36m", "Server initialised - http://localhost:8080");
});
