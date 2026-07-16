import prisma from "../../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ error: "Could not register user." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Could not find user." });
    } else {
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).json({ error: "Incorrect credentials " });
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            role: user.isAdmin,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          },
        );

        return res.json({ token });
      }
    }
  } catch (err) {
    return res.status(500).json({ error: "Could not log in user." });
  }
};
