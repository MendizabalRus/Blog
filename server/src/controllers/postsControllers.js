import { body, matchedData, validationResult } from "express-validator";
import prisma from "../../lib/prisma.js";

const commentValidation = [
  body("comment")
    .trim()
    .isEmpty()
    .withMessage("Comment cant be empty")
    .isLength({ max: 1000 })
    .withMessage("Comment must not exceed 1000 characters."),
];

// User routes controllers

export const getAllPublishedPosts = async (req, res) => {
  try {
    const allPublishedPosts = await prisma.post.findMany({
      where: {
        isPublished: true,
      },
    });

    return res.status(200).json(allPublishedPosts);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Could not fetch all the published posts." });
  }
};

export const getPost = async (req, res) => {
  const postId = parseInt(req.params.postId, 10);

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
        isPublished: true,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Could not find post." });
    }

    return res.status(200).json(post);
  } catch (err) {
    return res
      .status(500)
      .json({ error: `Could not fetch post with id ${postId}.` });
  }
};

export const getComments = async (req, res) => {
  const postId = parseInt(req.params.postId, 10);

  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
    });

    res.status(200).json(comments);
  } catch (err) {
    return res
      .status(500)
      .json({ error: `Could not fetch comments in post with id ${postId}.` });
  }
};

export const postComment = [
  commentValidation,

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(200).json({ error: errors.array() });
    }

    const postId = parseInt(req.params.postId, 10);
    const { body } = matchedData(req);

    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (!post) {
        return res.status(404).json({ error: "Could not find post" });
      }

      if (!body) {
        return res.status(400).json({ error: "Comment is missing a body" });
      }
      const comment = await prisma.comment.create({
        data: {
          body,
          postId,
          userId: req.user.id,
        },
      });

      res.status(201).json(comment);
    } catch (err) {
      return res
        .status(500)
        .json({ error: `Could not create comment in post with id ${postId}.` });
    }
  },
];

export const patchComment = [
  commentValidation,

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(200).json({ error: errors.array() });
    }

    const { body } = matchedData(req);
    const postId = parseInt(req.params.postId, 10);
    const commentId = parseInt(req.params.commentId, 10);

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Could not find post." });
    }

    if (!comment) {
      return res.status(404).json({ error: "Could not find comment." });
    }

    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return res
        .status(403)
        .json({ error: "Access to comment was forbidden." });
    }

    if (!body) {
      return res.status(400).json({ error: "Coment is missing a body." });
    }

    try {
      const patchedComment = await prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          body: body,
        },
      });

      res.status(200).json(patchedComment);
    } catch (err) {
      return res.status(500).json({
        error: `Could not update comment with id ${commentId} in post with id ${postId}.`,
      });
    }
  },
];

export const deleteComment = async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const commentId = parseInt(req.params.commentId, 10);

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return res.status(404).json({ error: "Could not find post" });
  }

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (!comment) {
    return res.status(404).json({ error: "Could not find comment." });
  }

  if (comment.userId !== req.user.id && !req.user.isAdmin) {
    return res
      .status(403)
      .json({ error: "Acces to comment deletion was forbidden." });
  }

  try {
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({
      error: `Could not delete comment with id ${commentId} in post with id ${postId}.`,
    });
  }
};

// Admin routes controllers

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany();

    return res.status(200).json(allPosts);
  } catch (err) {
    return res.status(500).json({ error: "Could not fetch all the posts." });
  }
};

export const createPost = async (req, res) => {
  const { title, body } = req.body;

  try {
    const createPost = await prisma.post.create({
      data: {
        title,
        body,
      },
    });

    return res.status(201).json(createPost);
  } catch {
    return res.status(500).json({ error: "Could not create post." });
  }
};

export const patchPost = async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const { title, body } = req.body;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Could not find post" });
    }

    const updatePost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: title,
        body: body,
      },
    });

    return res.status(200).json(updatePost);
  } catch (err) {
    return res.status(500).json({ error: "Could not update post." });
  }
};

export const patchTogglePublish = async (req, res) => {
  const postId = parseInt(req.params.postId, 10);

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Could not find post" });
    }

    if (post.isPublished) {
      await prisma.post.findUnique({
        where: {
          id: postId,
        },
        data: {
          isPublished: false,
        },
      });
    } else {
      await prisma.post.findUnique({
        where: {
          id: postId,
        },
        data: {
          isPublished: true,
        },
      });
    }

    return res.status(200).json(post.isPublished);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Could not toggle post's isPublish status" });
  }
};

export const deletePost = async (req, res) => {
  const postId = parseInt(req.params.postId, 10);

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Could not find post. " });
    }

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    res.status(204).send();
  } catch (err) {
    return res
      .status(500)
      .json({ error: `Could not delete post with id ${postId}.` });
  }
};
