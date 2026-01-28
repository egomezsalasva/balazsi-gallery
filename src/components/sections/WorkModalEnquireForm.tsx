"use client";
import React, { useState } from "react";
import posthog from "posthog-js";
import { sendWorkEnquiry } from "./actions/formSubmission";
import styles from "./WorkModalEnquireForm.module.css";
import type { WorkContentfulType } from "@/app/fair/[slug]/utils/fetchFair";

type WorkModalEnquireFormProps = {
  work: WorkContentfulType;
};

const WorkModalEnquireForm = ({ work }: WorkModalEnquireFormProps) => {
  const { title, details, artist } = work;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    `I would like to enquire about the work ${title} by ${artist?.name}.

With the following details: 
${details}`,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Add work details to formData
    formData.append("workTitle", title || "Untitled");
    formData.append("artistName", artist?.name || "Unknown Artist");

    const result = await sendWorkEnquiry(formData);

    if (result.success) {
      posthog.capture("enquire", {
        work_title: title,
        artist_name: artist?.name,
        user_email: email,
        user_name: name,
      });

      setStatusMessage({
        type: "success",
        text: "Thank you! Your enquiry has been sent.",
      });
      // Reset form
      setName("");
      setEmail("");
      setMessage(`I would like to enquire about the work ${title} by ${artist?.name}.

With the following details: 
${details}`);
    } else {
      setStatusMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    }

    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.enquireFormGroup}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className={styles.enquireFormGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.enquireFormGroup}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
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
        className={styles.enquireFormGroupButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send"}
      </button>
      {statusMessage && (
        <div
          style={{
            padding: "10px",
            marginBottom: "10px",
            backgroundColor:
              statusMessage.type === "success" ? "#d4edda" : "#f8d7da",
            color: statusMessage.type === "success" ? "#155724" : "#721c24",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          {statusMessage.text}
        </div>
      )}
    </form>
  );
};

export default WorkModalEnquireForm;
