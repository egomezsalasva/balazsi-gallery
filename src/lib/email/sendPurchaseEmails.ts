import nodemailer from "nodemailer";
import type Stripe from "stripe";

function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp.ilait.se",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

function formatMoney(amountTotal: number | null, currency: string | null) {
  if (amountTotal == null) return "—";
  const code = (currency ?? "eur").toUpperCase();
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: code,
  }).format(amountTotal / 100);
}

function formatAddress(
  address: Stripe.Address | null | undefined,
  name?: string | null,
) {
  if (!address) return "Not provided";
  const lines = [
    name,
    address.line1,
    address.line2,
    [address.postal_code, address.city].filter(Boolean).join(" "),
    address.state,
    address.country,
  ].filter(Boolean);
  return lines.join("<br>");
}

export async function sendPurchaseEmails({
  session,
  lineItems,
}: {
  session: Stripe.Checkout.Session;
  lineItems: Array<{ name: string; quantity: number; amount: string }>;
}) {
  const transporter = createTransporter();
  const galleryEmail = process.env.GALLERY_EMAIL!;
  const customerEmail =
    session.customer_details?.email ?? session.customer_email ?? null;
  const customerName = session.customer_details?.name ?? "Customer";
  const total = formatMoney(session.amount_total, session.currency);
  const itemsHtml = lineItems
    .map((item) => `<li>${item.name} × ${item.quantity} — ${item.amount}</li>`)
    .join("");

  const shipping = session.collected_information?.shipping_details;
  const shippingHtml = formatAddress(shipping?.address, shipping?.name);

  const orderHtml = `
    <h2>Order details</h2>
    <p><strong>Session:</strong> ${session.id}</p>
    <p><strong>Customer:</strong> ${customerName}</p>
    <p><strong>Email:</strong> ${customerEmail ?? "Not provided"}</p>
    <p><strong>Total:</strong> ${total}</p>
    <p><strong>Items:</strong></p>
    <ul>${itemsHtml}</ul>
    <p><strong>Shipping address:</strong></p>
    <p>${shippingHtml}</p>
  `;

  await transporter.sendMail({
    from: `"Balazsi Gallery" <${galleryEmail}>`,
    to: galleryEmail,
    replyTo: customerEmail ?? undefined,
    subject: `New collect order — ${total}`,
    html: `<h2>New collect purchase</h2>${orderHtml}`,
  });

  if (customerEmail) {
    await transporter.sendMail({
      from: `"Balazsi Gallery" <${galleryEmail}>`,
      to: customerEmail,
      subject: "Thank you for your purchase — Balazsi Gallery",
      html: `
        <h2>Thank you, ${customerName}</h2>
        <p>Your purchase was successful. We will be in touch shortly regarding shipping and delivery details.</p>
        ${orderHtml}
      `,
    });
  }
}
