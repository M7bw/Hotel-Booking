import { getAuth } from "@clerk/express";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    console.log("CLERK USER ID:", userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const user = await User.findById(userId);
    console.log("MONGO USER:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("PROTECT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};