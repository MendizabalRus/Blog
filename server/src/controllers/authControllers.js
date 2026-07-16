import { body, matchedData, validationResult } from "express-validator";
import prisma from "../../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerValidation = [
  body("username").trim().notEmpty(),
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .custom(async (email) => {
      const exists = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (exists) {
        throw new Error("An account with this e-mail address already exists!");
      }
      return true;
    }),
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 8, max: 30})
    .matches(/[a-z]/)
    .matches(/[A-Z]/)
    .matches(/[\d]/)
    .matches(/[^A-Za-z0-9]/),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Passwords do not match!")
      }
      return true
    })
];

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
