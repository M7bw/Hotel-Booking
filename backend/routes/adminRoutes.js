import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import {
  approveOwnerRequest,
  changeUserRole,
  deleteHotelByAdmin,
  deleteRoomByAdmin,
  getAdminDashboard,
  getAllHotels,
  getAllRooms,
  getAllUsers,
  getOwnerRequests,
  rejectOwnerRequest,
  toggleUserBlockStatus,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.use(protect, adminOnly);

adminRouter.get("/dashboard", getAdminDashboard);
adminRouter.get("/users", getAllUsers);
adminRouter.get("/owner-requests", getOwnerRequests);
adminRouter.post("/owner-requests/approve", approveOwnerRequest);
adminRouter.post("/owner-requests/reject", rejectOwnerRequest);
adminRouter.get("/hotels", getAllHotels);
adminRouter.get("/rooms", getAllRooms);
adminRouter.delete("/hotels/:hotelId", deleteHotelByAdmin);
adminRouter.delete("/rooms/:roomId", deleteRoomByAdmin);
adminRouter.post("/users/toggle-block", toggleUserBlockStatus);
adminRouter.post("/users/change-role", changeUserRole);

export default adminRouter;