"use server";
import { clearCart } from "@/lib/cart/cart";

export async function clearCartAction() {
  await clearCart();
}
