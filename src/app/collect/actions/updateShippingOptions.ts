"use server";

import { stripe } from "@/lib/stripe";
import { CURRENCY, SHIPPING_COUNTRIES } from "@/lib/shipping/constants";
import { getShippingCents } from "@/lib/shipping/getShippingCents";
import { getCartSlugs } from "@/lib/cart/cart";
import { fetchCollectPieceBySlug } from "../utils/fetchCollectPieceBySlug";

type ShippingDetails = {
  name: string;
  address: {
    line1?: string | null;
    line2?: string | null;
    city?: string | null;
    state?: string | null;
    postal_code?: string | null;
    country: string;
  };
};

function getShippingDisplayName(countryCode: string) {
  const country = SHIPPING_COUNTRIES.find((c) => c.code === countryCode);
  return country ? `Shipping ${country.label}` : "International Shipping";
}

export async function updateShippingOptions({
  checkoutSessionId,
  shippingDetails,
}: {
  checkoutSessionId: string;
  shippingDetails: ShippingDetails;
}) {
  const { name, address } = shippingDetails;
  const { country, line1 } = address;

  if (!country || !line1) {
    return { error: "Please enter a complete shipping address." };
  }

  const session = await stripe.checkout.sessions.retrieve(checkoutSessionId);
  if (!session) {
    return { error: "Checkout session not found." };
  }

  const slugs = await getCartSlugs();
  if (slugs.length === 0) {
    return { error: "Cart is empty." };
  }

  const pieces = await Promise.all(slugs.map(fetchCollectPieceBySlug));
  const validPieces = pieces.filter(Boolean);

  if (validPieces.length === 0) {
    return { error: "Unable to calculate shipping." };
  }

  const shippingCents = Math.max(
    ...validPieces.map((piece) => getShippingCents(piece, country)),
  );

  await stripe.checkout.sessions.update(checkoutSessionId, {
    collected_information: {
      shipping_details: {
        name,
        address: {
          line1,
          line2: address.line2 ?? undefined,
          city: address.city ?? undefined,
          state: address.state ?? undefined,
          postal_code: address.postal_code ?? undefined,
          country,
        },
      },
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: getShippingDisplayName(country),
          type: "fixed_amount",
          fixed_amount: { amount: shippingCents, currency: CURRENCY },
        },
      },
    ],
  });

  return { success: true };
}
