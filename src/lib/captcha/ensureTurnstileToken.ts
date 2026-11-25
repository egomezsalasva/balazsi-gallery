import type { RefObject } from "react";
import type { TurnstileFieldHandle } from "@/components/captcha/TurnstileField";

export async function ensureTurnstileToken(
  formData: FormData,
  turnstileRef: RefObject<TurnstileFieldHandle | null>,
): Promise<boolean> {
  let token = String(formData.get("cf-turnstile-response") ?? "");
  if (!token) {
    token = (await turnstileRef.current?.waitForToken()) ?? "";
  }
  if (!token) return false;
  formData.set("cf-turnstile-response", token);
  return true;
}
