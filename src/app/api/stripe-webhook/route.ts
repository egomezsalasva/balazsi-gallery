import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

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

  const collectId = event.data.object.metadata?.collectId;
  if (!collectId) return new Response("OK");

  const url = `https://api.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries/${collectId}`;
  const auth = {
    Authorization: `Bearer ${process.env.CONTENTFUL_MANAGEMENT_TOKEN}`,
  };

  const entry = await fetch(url, { headers: auth }).then((r) => r.json());

  const updated = await fetch(url, {
    method: "PUT",
    headers: {
      ...auth,
      "Content-Type": "application/vnd.contentful.management.v1+json",
      "X-Contentful-Version": String(entry.sys.version),
    },
    body: JSON.stringify({
      fields: { ...entry.fields, status: { "en-US": "sold" } },
    }),
  }).then((r) => r.json());

  await fetch(`${url}/published`, {
    method: "PUT",
    headers: { ...auth, "X-Contentful-Version": String(updated.sys.version) },
  });

  return new Response("OK");
}
