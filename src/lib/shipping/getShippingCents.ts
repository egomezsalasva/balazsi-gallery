import type { CollectPieceContentfulType } from "@/app/collect/utils/fetchCollectPieceBySlug";
import { SHIPPING_COUNTRIES } from "./constants";

export function getShippingCents(
  piece: CollectPieceContentfulType,
  countryCode: string,
) {
  const country = SHIPPING_COUNTRIES.find((c) => c.code === countryCode);
  return (country ? piece[country.field] : null) ?? piece.shippingFallback;
}
