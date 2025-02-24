import Razorpay from 'razorpay';
import crypto from "crypto";
import { Payment } from "../models/paymentModel.js";
import dotenv from 'dotenv';

dotenv.config();

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

export const checkout = async (req, res) => {
  try {
    const options = {
      amount:2000*100, // Convert amount to paise
      currency: "INR",
    };

    const order = await instance.orders.create(options);
       // Save order details in the database
       await Payment.create({
        razorpay_order_id: order.id,
        amount: options.amount,
        currency: options.currency,
        status: "created",
      });
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

export const paymentVerification = async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
      // Check if order_id exists
      if (!razorpay_order_id) {
        return res.status(400).json({ success: false, message: "Missing order ID" });
      }
  
      // Fetch payment using razorpay_order_id (instead of razorpay_payment_id)
      const payment = await Payment.findOne({ razorpay_order_id });
  
      if (!payment) {
        return res.status(400).json({
          success: false,
          message: "Payment record not found",
        });
      }
  
      // Verify payment signature
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.KEY_SECRET)
        .update(body.toString())
        .digest("hex");
  
      if (expectedSignature === razorpay_signature) {
        // Update existing payment record with payment ID and signature
        payment.razorpay_payment_id = razorpay_payment_id;
        payment.razorpay_signature = razorpay_signature;
        payment.status = "paid"; // Update status to paid
        await payment.save();
  
        res.json({
            success: true,
            reference: razorpay_payment_id
          });
          
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid payment signature",
        });
      }
    } catch (error) {
      console.error("Error verifying payment:", error.message);
      res.status(500).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  };
  