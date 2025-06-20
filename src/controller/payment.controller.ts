import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const getPaymentIntent = async (req: Request, res: Response) => {
  const amount = Number(req.body?.amount?.toFixed(2)) * 100; // Stripe expects the amount in cents.

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount),
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    res.status(500).send({ error: err?.message });
  }
};
