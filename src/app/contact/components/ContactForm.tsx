"use client";
import { useState } from "react";
import { sendContactEmail } from "../actions/formSubmission";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = await sendContactEmail(formData);

    if (result.success) {
      setMessage({
        type: "success",
        text: "Thank you! Your message has been sent.",
      });
      form.reset();
    } else {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again or email us at info@balazsi.com",
      });
    }

    setIsSubmitting(false);
  }

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" name="name" id="name" required />
      <input
        type="email"
        placeholder="Email"
        name="email"
        id="email"
        required
      />
      <input type="phone" placeholder="Phone" name="phone" id="phone" />
      <textarea placeholder="Message" name="message" id="message" required />
      <div className={styles.privacyPolicyContainer}>
        <input
          type="checkbox"
          name="privacyPolicy"
          id="privacyPolicy"
          required
        />
        <label htmlFor="privacyPolicy">
          I agree to the <a href="/privacy-policy">privacy policy</a>
        </label>
      </div>
      <button
        type="submit"
        className={styles.contactFormButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Enquire"}
      </button>
      {message && (
        <div
          style={{
            padding: "12px",
            marginBottom: "15px",
            backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
            color: message.type === "success" ? "#155724" : "#721c24",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          {message.text}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
