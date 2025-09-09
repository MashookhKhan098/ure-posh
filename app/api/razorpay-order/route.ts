import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_YourKeyHere", // Replace with your Razorpay key id
  key_secret: process.env.RAZORPAY_KEY_SECRET || "your_secret_here", // Replace with your Razorpay key secret
});

export async function POST(req: NextRequest) {
  try {
    const { amount, currency, receipt } = await req.json();

    const options = {
      amount: Math.round(Number(amount)), // amount in paise
      currency: currency || "INR",
      receipt: receipt || `rcpt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create Razorpay order" }, { status: 500 });
  }
}
