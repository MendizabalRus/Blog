import { body, matchedData, validationResult } from "express-validator";
import prisma from "../../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ min: 0, max: 15 })
    .withMessage("Username must not excced 15 characters.")
    .matches(/^(?!.*\.\.)(?![._-])(?!.*[._-]$)[A-Za-z0-9._-]+$/)
    .withMessage(
      "Username can only contain letters, numbers and '.', '-' and '_'. Note: username cannot begin or end with '.', '-' or '_'.",
    ),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("E-mail address is required.")
    .isEmail()
    .withMessage("E-mail address must be valid.")
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
    .withMessage("Password is required.")
    .isLength({ min: 8, max: 30 })
    .withMessage("Password must be between 8 and 30 characters.")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter.")
    .matches(/[\d]/)
    .withMessage("Password must contain a number.")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain a symbol."),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Passwords do not match!");
      }
      return true;
    }),
];

export const getCurrentUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      isAdmin: true,
    },
  });

  return res.json(user);
};

export const register = [
  registerValidation,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = matchedData(req);

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
  },
];

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
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          },
        );

        return res.json({
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
          },
        });
      }
    }
  } catch (err) {
    return res.status(500).json({ error: "Could not log in user." });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Could not find user." });
    }

    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ error: "Access forbidden. Non-admin credentials." });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Incorrect credentials " });
    }
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

    return res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: "Could not log in user." });
  }
};
