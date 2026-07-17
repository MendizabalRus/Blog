export const authorizeAdmin = (req, res, next) => {
  if (req.user.isAdmin !== true) {
    return res.status(403).json({ error: "Access frobidden." });
  }

  next();
};
export default authorizeAdmin;