export const requestHotelOwnerAccess = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const user = req.user;

    if (user.role === "hotelOwner") {
      return res.json({
        success: false,
        message: "You are already a hotel owner",
      });
    }

    if (user.ownerRequestStatus === "pending") {
      return res.json({
        success: false,
        message: "You already have a pending request",
      });
    }

    user.ownerRequestStatus = "pending";
    user.requestedHotelData = {
      name,
      address,
      contact,
      city,
    };

    await user.save();

    res.json({
      success: true,
      message: "Owner request submitted successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};