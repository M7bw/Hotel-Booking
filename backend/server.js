import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";

import clerkWebhooks from "./controllers/clerkWebhooks.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();

// Connect services once
let isConnected = false;

const initApp = async () => {
  if (!isConnected) {
    await connectDB();
    connectCloudinary();
    isConnected = true;
  }
};

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(clerkMiddleware());

// Stripe webhook must come before express.json()
app.post(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

// Clerk webhook if you use it
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

app.use(express.json());

app.get("/", async (req, res) => {
  await initApp();
  res.send("API is working");
});

app.use(async (req, res, next) => {
  await initApp();
  next();
});

app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/admin", adminRouter);

export default app;