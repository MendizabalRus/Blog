export const authorizeAdmin = (req, res, next) => {

  console.log(req.user)
  if (req.user.isAdmin !== true) {
    return res.status(403).json({ error: "Access frobidden." });
  }

  next();
};
export default authorizeAdmin;