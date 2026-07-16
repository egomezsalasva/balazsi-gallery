"use client";

import { useState, useTransition } from "react";
import { addToCart } from "../actions/addToCart";
import styles from "./PurchaseButton.module.css";

type PurchaseButtonProps = {
  slug: string;
};

export default function PurchaseButton({ slug }: PurchaseButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handlePurchase() {
    setError(null);
    startTransition(async () => {
      try {
        await addToCart(slug);
      } catch {
        setError("Something went wrong");
      }
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={handlePurchase}
        disabled={isPending}
        className={styles.purchaseBtn}
      >
        {isPending ? "Loading..." : "Purchase"}
      </button>
      {error && <p>{error}</p>}
    </>
  );
}
