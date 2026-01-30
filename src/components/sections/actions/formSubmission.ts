"use server";

import nodemailer from "nodemailer";

export async function sendWorkEnquiry(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const workTitle = formData.get("workTitle") as string;
  const artistName = formData.get("artistName") as string;

  const transporter = nodemailer.createTransport({
    host: "smtp.ilait.se",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Balazsi Gallery" <${process.env.GALLERY_EMAIL}>`,
      to: process.env.GALLERY_EMAIL,
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
