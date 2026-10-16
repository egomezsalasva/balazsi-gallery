"use server";

import { getCartSlugs } from "@/lib/cart/cart";
import { getShippingCents } from "@/lib/shipping/getShippingCents";
import { SHIPPING_COUNTRIES } from "@/lib/shipping/constants";
import { fetchCollectPieceBySlug } from "../utils/fetchCollectPieceBySlug";
import { formatEuroFromCents } from "../utils/formatEuroFromCents";

function getShippingDisplayName(countryCode: string) {
  const country = SHIPPING_COUNTRIES.find((c) => c.code === countryCode);
  return country ? `Shipping ${country.label}` : "International Shipping";
}

export async function getShippingQuote(countryCode: string) {
  const country = countryCode.toUpperCase();
  if (!country) return { error: "Please select a shipping country." };

  const slugs = await getCartSlugs();
  if (slugs.length === 0) return { error: "Cart is empty." };

  const pieces = await Promise.all(slugs.map(fetchCollectPieceBySlug));
  const validPieces = pieces.filter(Boolean);
  if (validPieces.length === 0) {
    return { error: "Unable to calculate shipping." };
  }

  const shippingCents = Math.max(
    ...validPieces.map((piece) => getShippingCents(piece, country)),
  );

  return {
    success: true as const,
    displayName: getShippingDisplayName(country),
    amount: formatEuroFromCents(shippingCents),
    shippingCents,
  };
}
