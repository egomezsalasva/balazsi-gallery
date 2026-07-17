"use server";

import { stripe } from "@/lib/stripe";
import { getCartSlugs } from "@/lib/cart/cart";
import { CURRENCY } from "@/lib/shipping/constants";
import { fetchCollectPieceBySlug } from "../utils/fetchCollectPieceBySlug";
import { ALL_SHIPPING_COUNTRIES } from "@/lib/shipping/allowedCountries";

export async function createCheckoutSession() {
  const slugs = await getCartSlugs();
  if (slugs.length === 0) return { error: "Cart is empty" };

  const pieces = await Promise.all(slugs.map(fetchCollectPieceBySlug));
  const validPieces = pieces.filter(Boolean);

  if (validPieces.length === 0) return { error: "Not found" };
  if (validPieces.some((piece) => piece.inventory < 1)) {
    return { error: "One or more items are no longer available" };
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const collectIds = validPieces.map((piece) => piece.sys.id).join(",");
  const shippingCents = Math.max(
    ...validPieces.map((piece) => piece.shippingFallback),
  );

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    ui_mode: "embedded_page",
    payment_method_types: ["card"],
    line_items: validPieces.map((piece) => ({
      price_data: {
        currency: CURRENCY,
        product_data: { name: piece.title },
        unit_amount: piece.price,
      },
      quantity: 1,
    })),
    metadata: { collectIds },
    shipping_address_collection: {
      allowed_countries: [...ALL_SHIPPING_COUNTRIES],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "International Shipping",
          type: "fixed_amount",
          fixed_amount: { amount: shippingCents, currency: CURRENCY },
        },
      },
    ],
    return_url: `${origin}/collect/success?session_id={CHECKOUT_SESSION_ID}`,
  });

  if (!session.client_secret) return { error: "Failed to create session" };
  return { clientSecret: session.client_secret };
}
