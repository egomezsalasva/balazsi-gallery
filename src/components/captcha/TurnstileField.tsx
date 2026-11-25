"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      remove: (widgetId: string) => void;
    };
  }
}

type TurnstileFieldProps = {
  /** Increment after a successful submit to mint a fresh token */
  resetToken?: number;
};

export default function TurnstileField({
  resetToken = 0,
}: TurnstileFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const renderWidget = () => {
    if (!siteKey || !containerRef.current || !window.turnstile) return;

    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    }

    if (inputRef.current) inputRef.current.value = "";

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token) => {
        if (inputRef.current) inputRef.current.value = token;
      },
      "expired-callback": () => {
        if (inputRef.current) inputRef.current.value = "";
      },
      "error-callback": () => {
        if (inputRef.current) inputRef.current.value = "";
      },
    });
  };

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    const tryRender = () => {
      if (cancelled) return;
      if (window.turnstile && containerRef.current) {
        renderWidget();
        return;
      }
      attempts += 1;
      if (attempts < 50) {
        window.setTimeout(tryRender, 100);
      }
    };

    tryRender();

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetToken, siteKey]);

  if (!siteKey) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
        clipPath: "inset(50%)",
      }}
    >
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
      />
      <input
        ref={inputRef}
        type="hidden"
        name="cf-turnstile-response"
        defaultValue=""
      />
      <div ref={containerRef} />
    </div>
  );
}