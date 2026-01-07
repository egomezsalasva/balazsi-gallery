import styles from "./ContactForm.module.css";

const ContactForm = () => {
  return (
    <form className={styles.contactForm}>
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
      <button type="submit" className={styles.contactFormButton}>
        Enquire
      </button>
    </form>
  );
};

export default ContactForm;
