"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CheckoutElementsProvider,
  ContactDetailsElement,
  PaymentElement,
  ShippingAddressElement,
  useCheckoutElements,
} from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "../actions/createCheckoutSession";
import { getShippingQuote } from "../actions/getShippingQuote";
import { updateShippingOptions } from "../actions/updateShippingOptions";
import { formatEuroFromCents } from "../utils/formatEuroFromCents";
import styles from "./CollectCheckout.module.css";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const appearanceBase = {
  theme: "stripe" as const,
  labels: "above" as const,
  variables: {
    colorPrimary: "#000000",
    colorBackground: "#ffffff",
    colorText: "#000000",
    colorTextSecondary: "#6b6b6b",
    colorDanger: "#df1b41",
    fontFamily: "Neue Haas Grotesk Display, Arial, Helvetica, sans-serif",
    fontSizeBase: "16px",
    borderRadius: "0px",
    spacingUnit: "4px",
  },
  rules: {
    ".Input": {
      backgroundColor: "transparent",
      border: "none",
      borderBottom: "1px solid #000000",
      borderRadius: "0",
      boxShadow: "none",
      paddingTop: "8px",
      paddingBottom: "8px",
      paddingLeft: "0",
      paddingRight: "0",
    },
    ".Input:focus": {
      border: "none",
      borderBottom: "1px solid #000000",
      boxShadow: "none",
      outline: "none",
    },
    ".Input--invalid": {
      border: "none",
      borderBottom: "1px solid #000000",
      boxShadow: "none",
    },
    ".Label": {
      fontFamily: "Neue Haas Grotesk Display, Arial, Helvetica, sans-serif",
      fontSize: "14px",
      color: "#000000",
    },
    ".Tab, .Block": {
      borderRadius: "0",
      boxShadow: "none",
    },
    ".Error": {
      fontSize: "0px",
      opacity: "0",
    },
    ".AccordionItem": {
      borderRadius: "0.25rem",
    },
  },
};

const appearanceShowErrors = {
  ...appearanceBase,
  rules: {
    ...appearanceBase.rules,
    ".Error": {
      fontSize: "13px",
      opacity: "1",
      color: "#df1b41",
    },
    ".Input--invalid": {
      border: "none",
      borderBottom: "1px solid #df1b41",
      boxShadow: "none",
    },
  },
};

type ShippingDetails = {
  name: string;
  address: {
    country?: string | null;
    line1?: string | null;
    line2?: string | null;
    city?: string | null;
    state?: string | null;
    postal_code?: string | null;
  };
};

function forceScrollTop(ms = 1500) {
  const toTop = () => window.scrollTo(0, 0);
  toTop();
  window.addEventListener("scroll", toTop, { passive: true });
  window.setTimeout(() => window.removeEventListener("scroll", toTop), ms);
}

function CheckoutInner() {
  const lastShippingCountry = useRef<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shippingLabel, setShippingLabel] = useState("Shipping");
  const [shippingAmount, setShippingAmount] = useState<string | null>(null);
  const [shippingCents, setShippingCents] = useState<number | null>(null);
  const checkoutState = useCheckoutElements();

  if (checkoutState.type === "loading") return null;
  if (checkoutState.type === "error") {
    return <div>Error: {checkoutState.error.message}</div>;
  }

  const { checkout } = checkoutState;
  const { lineItems, total, canConfirm } = checkout;

  const displayTotal =
    shippingCents != null
      ? formatEuroFromCents(total.subtotal.minorUnitsAmount + shippingCents)
      : total.total.amount;

  const syncShippingToSession = async (shippingDetails: ShippingDetails) => {
    let nextLabel = shippingLabel;
    let nextAmount = shippingAmount;
    let nextCents = shippingCents;

    const result = await checkout.runServerUpdate(async () => {
      const updateResult = await updateShippingOptions({
        checkoutSessionId: checkout.id,
        shippingDetails,
      });

      if ("error" in updateResult && updateResult.error) {
        throw new Error(updateResult.error);
      }

      if ("success" in updateResult && updateResult.success) {
        nextLabel = updateResult.displayName;
        nextAmount = updateResult.amount;
        nextCents = updateResult.shippingCents;
      }
    });

    if (result.type === "error") {
      throw new Error(result.error.message);
    }

    setShippingLabel(nextLabel);
    if (nextAmount) setShippingAmount(nextAmount);
    if (nextCents != null) setShippingCents(nextCents);
  };

  const handleShippingChange = async (event: {
    complete: boolean;
    value: ShippingDetails;
  }) => {
    const country = event.value.address.country?.toUpperCase() ?? null;
    if (!country) return;

    if (lastShippingCountry.current !== country) {
      lastShippingCountry.current = country;
      const quote = await getShippingQuote(country);
      if ("success" in quote && quote.success) {
        setShippingLabel(quote.displayName);
        setShippingAmount(quote.amount);
        setShippingCents(quote.shippingCents);
        setError(null);
      } else if ("error" in quote) {
        setError(quote.error);
        lastShippingCountry.current = null;
      }
    }

    if (!event.complete) return;

    try {
      await syncShippingToSession(event.value);
      setError(null);
    } catch (err) {
      console.error("Shipping update failed:", err);
      setError(err instanceof Error ? err.message : "Shipping update failed");
    }
  };

  const handlePay = async () => {
    setPaying(true);
    setError(null);
    try {
      checkout.changeAppearance(appearanceShowErrors);

      const addressElement = checkout.getShippingAddressElement();
      if (!addressElement) {
        setError("Shipping address is required.");
        return;
      }

      const { complete, value } = await addressElement.getValue();
      if (!complete) {
        setError("Please complete your shipping address.");
        return;
      }

      await syncShippingToSession(value);

      const result = await checkout.confirm();
      if (result.type === "error") {
        setError(result.error.message);
      }
    } catch (err) {
      console.error("Payment confirmation error:", err);
      setError(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.summary}>
        <p className={styles.totalPrice}>{displayTotal}</p>

        <ul className={styles.lineItems}>
          {lineItems.map((item) => (
            <li key={item.id} className={styles.lineItem}>
              {item.images[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.images[0]}
                  alt=""
                  className={styles.lineItemImage}
                />
              ) : null}
              <div className={styles.lineItemRow}>
                <span>{item.name}</span>
                <span>{item.total.amount}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.totals}>
          <div className={styles.totalRow}>
            <span>Subtotal</span>
            <span>{total.subtotal.amount}</span>
          </div>
          <div className={styles.totalRow}>
            <span>{shippingLabel}</span>
            <span>{shippingAmount ?? total.shippingRate.amount}</span>
          </div>
          <hr className={styles.divider} />
          <div className={styles.totalDue}>
            <span>Total due</span>
            <span>{displayTotal}</span>
          </div>
        </div>
      </aside>

      <div className={styles.formColumn}>
        <section>
          <ContactDetailsElement />
        </section>

        <section>
          <h2 className={styles.sectionTitle}>Shipping</h2>
          <ShippingAddressElement onChange={handleShippingChange} />
        </section>

        <section>
          <h2 className={styles.sectionTitle}>Payment method</h2>
          <PaymentElement />
        </section>

        {error && <p className={styles.error}>{error}</p>}

        <button
          type="button"
          className={styles.payButton}
          disabled={!canConfirm || paying}
          onClick={handlePay}
        >
          {paying ? "Processing…" : `Pay ${displayTotal}`}
        </button>
      </div>
    </div>
  );
}

export default function CollectCheckout() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    forceScrollTop();
  }, []);

  useEffect(() => {
    let cancelled = false;

    createCheckoutSession().then((result) => {
      if (cancelled) return;

      if ("clientSecret" in result && result.clientSecret) {
        setClientSecret(result.clientSecret);
      } else {
        setError(
          "error" in result && result.error
            ? result.error
            : "Failed to create session",
        );
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const options = useMemo(
    () =>
      clientSecret
        ? { clientSecret, elementsOptions: { appearance: appearanceBase } }
        : null,
    [clientSecret],
  );

  if (error) {
    return (
      <div className={styles.checkout}>
        <p>{error}</p>
      </div>
    );
  }

  if (!options) {
    return <div className={styles.checkout} />;
  }

  return (
    <div className={styles.checkout}>
      <CheckoutElementsProvider stripe={stripePromise} options={options}>
        <CheckoutInner />
      </CheckoutElementsProvider>
    </div>
  );
}
