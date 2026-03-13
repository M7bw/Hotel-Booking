import Stripe from "stripe";
import Booking from "../models/Booking.js";

export const stripeWebhooks = async (request, response) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("Webhook Error:", err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    console.log("Stripe Event Type:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      console.log("Session metadata:", session.metadata);

      const bookingId = session.metadata?.bookingId;

      if (!bookingId) {
        console.log("bookingId not found in metadata");
        return response.status(400).json({
          success: false,
          message: "bookingId missing",
        });
      }

      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        {
          isPaid: true,
          paymentMethod: "Stripe",
          status: "confirmed",
        },
        { new: true }
      );

      console.log("Updated booking:", updatedBooking);
    } else {
      console.log("Unhandled event type:", event.type);
    }

    return response.json({ received: true });
  } catch (error) {
    console.log("Webhook processing error:", error.message);
    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};