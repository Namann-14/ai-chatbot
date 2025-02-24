import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    default: null, // Not required during order creation; added after payment is processed
  },
  razorpay_signature: {
    type: String,
    default: null, // Same as above
  },
  amount: {
    type: Number,
    required: true, // Store the payment amount for additional context
  },
  currency: {
    type: String,
    default: "INR",
  },
  verified: {
    type: Boolean,
    default: false, // To mark if the payment has been successfully verified
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Payment = mongoose.model("Payment", paymentSchema);
