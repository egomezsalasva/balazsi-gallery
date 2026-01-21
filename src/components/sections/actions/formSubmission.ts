"use server";

import nodemailer from "nodemailer";

export async function sendWorkEnquiry(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const workTitle = formData.get("workTitle") as string;
  const artistName = formData.get("artistName") as string;

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
      subject: `Work Enquiry: ${workTitle} by ${artistName}`,
      html: `
        <h2>Work Enquiry</h2>
        <p><strong>Artwork:</strong> ${workTitle}</p>
        <p><strong>Artist:</strong> ${artistName}</p>
        <hr>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Work enquiry error:", error);
    return { success: false, error: "Failed to send enquiry" };
  }
}
