import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";

// API to create a new room for the logged-in hotel owner
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;

    const hotel = await Hotel.findOne({ owner: req.user._id });

    if (!hotel) {
      return res.json({ success: false, message: "No hotel found for this owner" });
    }

    if (!roomType || !pricePerNight) {
      return res.json({
        success: false,
        message: "Room type and price per night are required",
      });
    }

    const files = req.files || [];

    const uploadImages = files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });

    const images = await Promise.all(uploadImages);

    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: Number(pricePerNight),
      amenities: amenities ? JSON.parse(amenities) : [],
      images,
      isAvailable: true,
    });

    res.json({ success: true, message: "Room created successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get all available rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "username email image",
        },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get all rooms for the logged-in hotel owner
export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({ owner: req.user._id });

    if (!hotelData) {
      return res.json({ success: false, message: "No hotel found for this owner" });
    }

    const rooms = await Room.find({ hotel: hotelData._id }).populate("hotel");

    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to toggle room availability
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;

    const roomData = await Room.findById(roomId);
    if (!roomData) {
      return res.json({ success: false, message: "Room not found" });
    }

    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();

    res.json({
      success: true,
      message: "Room availability updated successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};