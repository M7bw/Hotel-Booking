import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  createRoom,
  getOwnerRooms,
  getRooms,
  toggleRoomAvailability,
} from "../controllers/roomController.js";

const roomRouter = express.Router();

roomRouter.get("/", getRooms);
roomRouter.get("/owner", protect, getOwnerRooms);
roomRouter.post("/", protect, upload.array("images", 4), createRoom);
roomRouter.post("/toggle-availability", protect, toggleRoomAvailability);

export default roomRouter;