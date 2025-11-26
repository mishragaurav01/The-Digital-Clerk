import crypto from "crypto";
import { razorpay } from "../server.js"; 

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order
    });

  } catch (error) {
    console.error("Order create error:", error);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};


export const getKey = async (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_KEY_ID
  });
};


export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;
    console.log("Expected Signature:", expectedSignature);
    console.log("Received Signature:", razorpay_signature);

    if (isValid) {
      // OPTIONAL: Save payment in your DB
      // PaymentModel.create({ razorpay_payment_id, razorpay_order_id, status: "Success" });
        console.log("Payment verified:", { razorpay_payment_id, razorpay_order_id });
      return res.status(200).json({
        success: true,
        message: "Payment verified"
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });
    }
  } catch (error) {
    console.error("Payment verify error:", error);
    res.status(500).json({ success: false, message: "Verification error" });
  }
};
