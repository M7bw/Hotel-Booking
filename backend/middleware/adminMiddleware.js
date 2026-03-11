export const adminOnly = async (req, res, next) => {
  try {
    console.log("ADMIN CHECK USER:", req.user);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access only",
      });
    }

    next();
  } catch (error) {
    console.log("ADMIN MIDDLEWARE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};