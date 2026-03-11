import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import User from "../models/User.js";

export const getAdminDashboard = async (req, res) => {
  try {
    const totalOwners = await User.countDocuments({ role: "hotelOwner" });
    const totalHotels = await Hotel.countDocuments();
    const totalRooms = await Room.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const bookings = await Booking.find()
      .populate("user room hotel")
      .sort({ createdAt: -1 });

    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + (booking.totalPrice || 0),
      0
    );

    res.json({
      success: true,
      dashboardData: {
        totalOwners,
        totalHotels,
        totalRooms,
        totalBookings,
        totalRevenue,
        bookings: bookings.slice(0, 10),
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getOwnerRequests = async (req, res) => {
  try {
    const requests = await User.find({ ownerRequestStatus: "pending" }).sort({
      createdAt: -1,
    });

    res.json({ success: true, requests });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const approveOwnerRequest = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.ownerRequestStatus !== "pending") {
      return res.json({ success: false, message: "No pending request found" });
    }

    const { name, address, contact, city } = user.requestedHotelData || {};

    if (!name || !address || !contact || !city) {
      return res.json({
        success: false,
        message: "Requested hotel data is incomplete",
      });
    }

    const existingHotel = await Hotel.findOne({ owner: user._id });
    if (existingHotel) {
      user.role = "hotelOwner";
      user.ownerRequestStatus = "approved";
      user.requestedHotelData = {
        name: "",
        address: "",
        contact: "",
        city: "",
      };
      await user.save();

      return res.json({
        success: true,
        message: "User already had a hotel, role updated successfully",
      });
    }

    await Hotel.create({
      name,
      address,
      contact,
      city,
      owner: user._id,
    });

    user.role = "hotelOwner";
    user.ownerRequestStatus = "approved";
    user.requestedHotelData = {
      name: "",
      address: "",
      contact: "",
      city: "",
    };

    await user.save();

    res.json({
      success: true,
      message: "Owner request approved successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const rejectOwnerRequest = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    user.ownerRequestStatus = "rejected";
    user.requestedHotelData = {
      name: "",
      address: "",
      contact: "",
      city: "",
    };

    await user.save();

    res.json({
      success: true,
      message: "Owner request rejected successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find()
      .sort({ createdAt: -1 })
      .populate("owner");

    res.json({ success: true, hotels });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "username email",
        },
      });

    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteHotelByAdmin = async (req, res) => {
  try {
    const { hotelId } = req.params;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.json({ success: false, message: "Hotel not found" });
    }

    await Room.deleteMany({ hotel: hotelId });
    await Booking.deleteMany({ hotel: hotelId });

    const owner = await User.findById(hotel.owner);
    if (owner && owner.role !== "admin") {
      owner.role = "user";
      owner.ownerRequestStatus = "none";
      await owner.save();
    }

    await Hotel.findByIdAndDelete(hotelId);

    res.json({ success: true, message: "Hotel deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteRoomByAdmin = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.json({ success: false, message: "Room not found" });
    }

    await Room.findByIdAndDelete(roomId);
    await Booking.deleteMany({ room: roomId });

    res.json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const toggleUserBlockStatus = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.role === "admin") {
      return res.json({ success: false, message: "Admin cannot be blocked" });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({
      success: true,
      message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const changeUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;

    if (!userId || !role) {
      return res.json({
        success: false,
        message: "User ID and role are required",
      });
    }

    if (!["user", "hotelOwner"].includes(role)) {
      return res.json({ success: false, message: "Invalid role" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.role === "admin") {
      return res.json({
        success: false,
        message: "Admin role cannot be changed",
      });
    }

    if (role === "hotelOwner") {
      const hotel = await Hotel.findOne({ owner: user._id });
      if (!hotel) {
        return res.json({
          success: false,
          message: "Cannot set hotelOwner role without a hotel",
        });
      }
      user.ownerRequestStatus = "approved";
    }

    if (role === "user") {
      user.ownerRequestStatus = "none";
    }

    user.role = role;
    await user.save();

    res.json({ success: true, message: "User role updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};