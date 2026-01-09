import styles from "./Footer.module.css";
import IntagramIcon from "./svgs/Intagram";
import VimeoIcon from "./svgs/Vimeo";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.footerNewsletterContainer}>
        <p>
          Subscribe to our Newsletter for artist’s and gallery news, upcoming
          exhibitions, events, releases, and more
        </p>
        <form>
          <div className={styles.footerNewsletterFormInputContainer}>
            <input
              type="text"
              placeholder="Name"
              className={styles.footerNewsletterFormInputName}
            />
            <input
              type="email"
              placeholder="Email"
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
          <button type="submit" className={styles.footerNewsletterFormButton}>
            Send
          </button>
        </form>
      </div>
      <div className={styles.footerContactSocialsContainer}>
        <div className={styles.socialsContainer}>
          <a
            href="https://www.instagram.com/balazsi.gallery/"
            target="_blank"
            className={styles.socialIcon}
          >
            <IntagramIcon className={styles.socialIconImage} />
          </a>
          <a
            href="https://vimeo.com/balazsi.gallery"
            target="_blank"
            className={styles.socialIcon}
          >
            <VimeoIcon
              className={`${styles.socialIconImage} ${styles.vimeoIconImage}`}
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
