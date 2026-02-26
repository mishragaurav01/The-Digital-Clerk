import express from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import userRoutes from "./routes/userRoute.js";
import paymentRoutes from "./routes/paymentRoute.js";
import { connectDB } from "./lib/db.js";
import Razorpay from "razorpay";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    "http://82.112.236.35",
    "http://82.112.236.35:3000",
    "http://82.112.236.35:5001",
    "http://10.116.5.233:3000",
    "http://10.116.5.233:5000/",
    "http://10.116.5.233:5000/",
    "http://localhost:3000",
    "http://localhost:3000",
    "http://localhost:5001",
    "http://localhost:5001",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Serve static files (uploaded documents)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/estamp", requestRoutes);
app.use("/api/users", userRoutes);

app.use("/api/payment", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

// export const createOrder = async (req, res) => {
//   try {
//     const instance = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET
//     });

//     const options = {
//       amount: req.body.amount * 100, // convert to paise
//       currency: "INR",
//       receipt: "receipt_order_1"
//     };

//     const order = await instance.orders.create(options);
//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
