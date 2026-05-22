"use client";
import React, { useState } from "react";
import IntagramIcon from "../svgs/Intagram";
import VimeoIcon from "../svgs/Vimeo";
import { sendNewsletterSubscription } from "./actions/formSubmission";
import styles from "./Footer.module.css";
import LinkedInIcon from "../svgs/LinkedIn";

const Footer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const form = event.currentTarget; // Store the form reference
    const formData = new FormData(form);
    const result = await sendNewsletterSubscription(formData);

    if (result.success) {
      setMessage({
        type: "success",
        text: "Thank you for subscribing!",
      });
      form.reset();
    } else {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    }

    setIsSubmitting(false);
  }

  return (
    <footer className={styles.container}>
      <div className={styles.footerNewsletterContainer}>
        <p>
          Subscribe to our Newsletter for artist’s and gallery news, upcoming
          exhibitions, events, releases, and more
        </p>
        <form onSubmit={handleSubmit}>
          <div className={styles.footerNewsletterFormInputContainer}>
            <input
              type="text"
              placeholder="Name"
              className={styles.footerNewsletterFormInputName}
              name="name"
              id="name"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              className={styles.footerNewsletterFormInputEmail}
            />
          </div>
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
            className={styles.footerNewsletterFormButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
          {message && (
            <div
              style={{
                padding: "10px",
                marginBottom: "10px",
                backgroundColor:
                  message.type === "success" ? "#d4edda" : "#f8d7da",
                color: message.type === "success" ? "#155724" : "#721c24",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            >
              {message.text}
            </div>
          )}
        </form>
      </div>
      <div className={styles.footerContactSocialsContainer}>
        <div className={styles.socialsContainer}>
          <a
            href="https://www.instagram.com/balazsigallery/"
            target="_blank"
            className={styles.socialIcon}
          >
            <IntagramIcon className={styles.socialIconImage} />
          </a>
          <a
            href="https://vimeo.com/balazsigallery"
            target="_blank"
            className={styles.socialIcon}
          >
            <VimeoIcon
              className={`${styles.socialIconImage} ${styles.vimeoIconImage}`}
            />
          </a>
          <a
            href="https://www.linkedin.com/company/balazsi/posts/?feedView=all"
            target="_blank"
            className={styles.socialIcon}
          >
            <LinkedInIcon
              className={`${styles.socialIconImage} ${styles.linkedInIconImage}`}
            />
          </a>
        </div>
        <p>
          Carrer Nicolau de Pacs 25, 07006
          <br />
          Palma de Mallorca, Spain
        </p>
        <p>
          Mon to Fri
          <br />
          11.00 – 17.00
        </p>
        <div className={styles.footerContactSocialsContainerLinks}>
          <a href="tel:+34660698599">+34 660 698 599</a>
          <br />
          <a href="mailto:info@balazsi.com">info@balazsi.com</a>
        </div>
      </div>
      <div className={styles.footerCopyrightContainer}>
        <p>
          &copy; Copyright {new Date().getFullYear()} Balazsi Gallery |{" "}
          <a href="/privacy-policy" className={styles.footerCopyrightLink}>
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
