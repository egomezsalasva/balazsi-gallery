"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "../actions/createCheckoutSession";
import styles from "./CollectCheckout.module.css";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function CollectCheckout() {
  return (
    <div className={styles.checkout}>
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          fetchClientSecret: async () => {
            const result = await createCheckoutSession();

            if ("clientSecret" in result && result.clientSecret) {
              return result.clientSecret;
            }

            throw new Error(
              "error" in result ? result.error : "Failed to create session",
            );
          },
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
