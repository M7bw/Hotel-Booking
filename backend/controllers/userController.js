import { getAuth } from "@clerk/express";
import User from "../models/User.js";

export const syncUser = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const { username, email, image } = req.body;

    let user = await User.findById(userId);

    if (!user) {
      user = await User.create({
        _id: userId,
        username,
        email,
        image,
        role: "user",
        recentSearchedCities: [],
      });
    } else {
      user.username = username;
      user.email = email;
      user.image = image;
      await user.save();
    }

    return res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserData = async (req, res) => {
  try {
    return res.json({
      success: true,
      role: req.user.role,
      isBlocked: req.user.isBlocked,
      ownerRequestStatus: req.user.ownerRequestStatus,
      recentSearchedCities: req.user.recentSearchedCities,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const storeRecentSearchedCities = async (req, res) => {
  try {
    const { recentSearchedCity } = req.body;
    const user = req.user;

    if (!recentSearchedCity) {
      return res.json({
        success: false,
        message: "City is required",
      });
    }

    const filtered = (user.recentSearchedCities || []).filter(
      (city) => city !== recentSearchedCity
    );

    filtered.push(recentSearchedCity);

    if (filtered.length > 3) {
      filtered.shift();
    }

    user.recentSearchedCities = filtered;
    await user.save();

    return res.json({ success: true, message: "City added" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};