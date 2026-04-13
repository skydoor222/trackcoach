import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      // TODO: Update booking payment_status to 'held'
      break;
    }
    case "payment_intent.payment_failed": {
      // TODO: Update booking status and notify user
      break;
    }
    case "transfer.created": {
      // TODO: Update booking payment_status to 'released'
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
