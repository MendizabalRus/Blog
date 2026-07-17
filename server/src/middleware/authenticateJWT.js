import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token is missing." });
  } else {
    const token = authHeader.split(" ")[1];

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      req.user = payload;

      next();
    } catch {
      return res.status(401).json({ error: "Invalid token" });
    }
  }
};
export default authenticateJWT;