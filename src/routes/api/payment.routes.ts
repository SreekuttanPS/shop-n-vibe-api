// routes/payment.ts
import express from "express";
import Stripe from "stripe";
import { getPaymentIntent } from "../../controller/payment.controller";

const router = express.Router();

router.post("/create-payment-intent", getPaymentIntent);

export default router;
