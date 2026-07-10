import type { CollectPiecesContentfulType } from "@/app/collect/utils/fetchCollectPieces";
import { SHIPPING_COUNTRIES } from "./constants";

export function getShippingCents(
  piece: CollectPiecesContentfulType,
  countryCode: string,
) {
  const country = SHIPPING_COUNTRIES.find((c) => c.code === countryCode);
  return (country ? piece[country.field] : null) ?? piece.shippingFallback;
}
