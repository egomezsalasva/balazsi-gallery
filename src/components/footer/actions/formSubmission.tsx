"use server";

import nodemailer from "nodemailer";

export async function sendNewsletterSubscription(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_MAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Balazsi Gallery" <${process.env.GMAIL_MAIL}>`,
      to: process.env.GMAIL_MAIL,
      replyTo: email,
      subject: `New Newsletter Subscription - ${name}`,
      html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return { success: false, error: "Failed to subscribe" };
  }
}
