import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { sendPurchaseEmails } from "@/lib/email/sendPurchaseEmails";

async function decrementCollectInventory(collectId: string) {
  const url = `https://api.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries/${collectId}`;
  const auth = {
    Authorization: `Bearer ${process.env.CONTENTFUL_MANAGEMENT_TOKEN}`,
  };

  const entry = await fetch(url, { headers: auth }).then((r) => r.json());

  if (!entry?.fields) {
    console.error("Contentful entry fetch failed:", collectId, entry);
    return;
  }

  const currentInventory = entry.fields.inventory?.["en-US"] ?? 0;
  if (currentInventory < 1) return;

  const updated = await fetch(url, {
    method: "PUT",
    headers: {
      ...auth,
      "Content-Type": "application/vnd.contentful.management.v1+json",
      "X-Contentful-Version": String(entry.sys.version),
    },
    body: JSON.stringify({
      fields: {
        ...entry.fields,
        inventory: { "en-US": currentInventory - 1 },
      },
    }),
  }).then((r) => r.json());

  if (!updated?.sys?.version) {
    console.error("Contentful inventory update failed:", collectId, updated);
    return;
  }

  await fetch(`${url}/published`, {
    method: "PUT",
    headers: { ...auth, "X-Contentful-Version": String(updated.sys.version) },
  });
}

export async function POST(req: Request) {
  const signature = (await headers()).get("stripe-signature");
  if (!signature) return new Response(null, { status: 400 });

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      await req.text(),
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    console.error("Stripe webhook signature failed:", error);
    return new Response(null, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") return new Response("OK");

  const session = event.data.object;
  const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["line_items"],
  });
  const metadata = fullSession.metadata ?? {};

  const collectIds = metadata.collectIds
    ? metadata.collectIds.split(",").filter(Boolean)
    : metadata.collectId
      ? [metadata.collectId]
      : [];

  if (collectIds.length > 0 && metadata.inventoryDecremented !== "true") {
    try {
      await Promise.all(collectIds.map(decrementCollectInventory));
      await stripe.checkout.sessions.update(session.id, {
        metadata: { ...metadata, inventoryDecremented: "true" },
      });
    } catch (error) {
      console.error("Inventory decrement failed:", error);
    }
  }

  if (metadata.purchaseEmailSent !== "true") {
    try {
      const lineItems =
        fullSession.line_items?.data.map((item) => ({
          name: item.description ?? "Item",
          quantity: item.quantity ?? 1,
          amount: new Intl.NumberFormat("en", {
            style: "currency",
            currency: (item.currency ?? "eur").toUpperCase(),
          }).format((item.amount_total ?? 0) / 100),
        })) ?? [];

      await sendPurchaseEmails({ session: fullSession, lineItems });

      await stripe.checkout.sessions.update(session.id, {
        metadata: {
          ...metadata,
          inventoryDecremented: "true",
          purchaseEmailSent: "true",
        },
      });
    } catch (error) {
      console.error("Purchase email failed:", error);
    }
  }

  return new Response("OK");
}
