export const adminOnly = async (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.json({ success: false, message: "Admin access only" });
  }

  next();
};