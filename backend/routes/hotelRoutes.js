import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { requestHotelOwnerAccess } from "../controllers/hotelController.js";

const hotelRouter = express.Router();

hotelRouter.post("/request-owner-access", protect, requestHotelOwnerAccess);

export default hotelRouter;