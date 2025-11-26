import express from 'express';
import { createOrder, verifyPayment, getKey } from '../controller/paymentController.js';

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
router.get("/getkey", getKey);

export default router;
