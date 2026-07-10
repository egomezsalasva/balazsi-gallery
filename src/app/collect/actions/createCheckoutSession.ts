"use server";

import { stripe } from "@/lib/stripe";
import { CURRENCY } from "@/lib/shipping/constants";
import { fetchCollectPieceBySlug } from "../utils/fetchCollectPieceBySlug";
import { ALL_SHIPPING_COUNTRIES } from "@/lib/shipping/allowedCountries";

export async function createCheckoutSession(slug: string) {
  const piece = await fetchCollectPieceBySlug(slug);

  if (!piece) return { error: "Not found" };
  if (piece.status !== "available") return { error: "No longer available" };

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: CURRENCY,
          product_data: { name: piece.title },
          unit_amount: piece.price,
        },
        quantity: 1,
      },
    ],
    metadata: { collectId: piece.sys.id },
    shipping_address_collection: {
      allowed_countries: [...ALL_SHIPPING_COUNTRIES],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "International Shipping",
          type: "fixed_amount",
          fixed_amount: { amount: piece.shippingFallback, currency: CURRENCY },
        },
      },
    ],
    success_url: `${origin}/collect/success`,
    cancel_url: `${origin}/collect/pieces`,
  });

  if (!session.url) return { error: "Failed to create session" };
  return { url: session.url };
}
