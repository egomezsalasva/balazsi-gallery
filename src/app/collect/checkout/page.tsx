import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCartSlugs } from "@/lib/cart/cart";
import CollectCheckout from "../components/CollectCheckout";

export const metadata: Metadata = {
  title: "Checkout | Balazsi Gallery",
};

export default async function CollectCheckoutPage() {
  const slugs = await getCartSlugs();
  if (slugs.length === 0) redirect("/collect/pieces");

  return <CollectCheckout />;
}
