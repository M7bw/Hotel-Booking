import Stripe from "stripe";
import Booking from "../models/Booking.js";

// API to handle Stripe Webhooks
export const stripeWebhooks = async (request, response) => {
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

  const sig = request.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("Webhook Error:", err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // Handle successful payment
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      // Get session metadata
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { bookingId } = session.data[0].metadata;

      // Mark booking as paid
      await Booking.findByIdAndUpdate(bookingId, {
        isPaid: true,
        paymentMethod: "Stripe",
      });

      console.log("BOOKING MARKED AS PAID:", bookingId);
    } else {
      console.log("Unhandled event type:", event.type);
    }

    response.json({ received: true });
  } catch (error) {
    console.log("Webhook processing error:", error.message);
    response.status(500).json({ success: false });
  }
};