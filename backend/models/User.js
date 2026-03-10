import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },

    role: {
      type: String,
      enum: ["user", "hotelOwner", "admin"],
      default: "user",
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    ownerRequestStatus: {
      type: String,
      enum: ["none", "pending", "approved", "rejected"],
      default: "none",
    },

    requestedHotelData: {
      name: { type: String, default: "" },
      address: { type: String, default: "" },
      contact: { type: String, default: "" },
      city: { type: String, default: "" },
    },

    recentSearchedCities: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;