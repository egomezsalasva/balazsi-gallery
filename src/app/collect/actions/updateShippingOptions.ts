"use server";

import { stripe } from "@/lib/stripe";
import { CURRENCY, SHIPPING_COUNTRIES } from "@/lib/shipping/constants";
import { getShippingCents } from "@/lib/shipping/getShippingCents";
import { getCartSlugs } from "@/lib/cart/cart";
import { fetchCollectPieceBySlug } from "../utils/fetchCollectPieceBySlug";
import { formatEuroFromCents } from "../utils/formatEuroFromCents";

type ShippingDetails = {
  name?: string | null;
  address: {
    line1?: string | null;
    line2?: string | null;
    city?: string | null;
    state?: string | null;
    postal_code?: string | null;
    country?: string | null;
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
  const country = shippingDetails.address.country?.toUpperCase();
  if (!country) {
    return { error: "Please select a shipping country." };
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
  const displayName = getShippingDisplayName(country);

  await stripe.checkout.sessions.update(checkoutSessionId, {
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: displayName,
          type: "fixed_amount",
          fixed_amount: { amount: shippingCents, currency: CURRENCY },
        },
      },
    ],
  });

  return {
    success: true as const,
    displayName,
    amount: formatEuroFromCents(shippingCents),
    shippingCents,
  };
}
