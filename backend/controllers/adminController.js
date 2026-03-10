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
      (acc, booking) => acc + booking.totalPrice,
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