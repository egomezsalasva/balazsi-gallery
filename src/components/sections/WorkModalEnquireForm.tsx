"use client";
import { useEffect, useState } from "react";
import { WorkType } from "./Work";
import styles from "./WorksSection.module.css";

type WorkModalEnquireFormProps = {
  work: WorkType;
};

const WorkModalEnquireForm = ({ work }: WorkModalEnquireFormProps) => {
  const { title, details, artist } = work;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    setMessage(`I would like to enquire about the work ${title} by ${artist?.name}.

With the following details: 
${details}`);
  }, [work]);
  return (
    <form>
      <div className={styles.enquireFormGroup}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        />
      </div>
      <div className={styles.enquireFormGroup}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button type="submit" className={styles.enquireFormGroupButton}>
        Send
      </button>
    </form>
  );
};

export default WorkModalEnquireForm;
