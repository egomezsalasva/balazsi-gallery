"use client";

import { useState } from "react";
import { createCheckoutSession } from "../actions/createCheckoutSession";
import styles from "./PurchaseButton.module.css";

type PurchaseButtonProps = {
  slug: string;
};

export default function PurchaseButton({ slug }: PurchaseButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handlePurchase() {
    setLoading(true);
    const result = await createCheckoutSession(slug);

    if ("url" in result && result.url) {
      window.location.href = result.url;
    } else {
      alert(result.error ?? "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handlePurchase}
      disabled={loading}
      className={styles.purchaseBtn}
    >
      {loading ? "Loading..." : "Purchase"}
    </button>
  );
}
