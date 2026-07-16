"use server";

import { redirect } from "next/navigation";
import { setCartSlugs } from "@/lib/cart/cart";

export async function addToCart(slug: string) {
  await setCartSlugs([slug]);
  redirect("/collect/checkout");
}
