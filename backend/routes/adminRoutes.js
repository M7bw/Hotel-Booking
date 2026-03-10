import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { getAdminDashboard } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.use(protect, adminOnly);

adminRouter.get("/dashboard", getAdminDashboard);

export default adminRouter;