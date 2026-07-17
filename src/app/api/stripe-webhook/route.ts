import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

async function decrementCollectInventory(collectId: string) {
  const url = `https://api.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries/${collectId}`;
  const auth = {
    Authorization: `Bearer ${process.env.CONTENTFUL_MANAGEMENT_TOKEN}`,
  };

  const entry = await fetch(url, { headers: auth }).then((r) => r.json());
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
  } catch {
    return new Response(null, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") return new Response("OK");

  const metadata = event.data.object.metadata ?? {};
  const collectIds = metadata.collectIds
    ? metadata.collectIds.split(",").filter(Boolean)
    : metadata.collectId
      ? [metadata.collectId]
      : [];

  if (collectIds.length === 0) return new Response("OK");

  await Promise.all(collectIds.map(decrementCollectInventory));

  return new Response("OK");
}
