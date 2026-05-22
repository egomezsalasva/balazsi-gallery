import { Metadata } from "next";
import styles from "./page.module.css";
import ContactForm from "./components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Balazsi Gallery",
  description: "Contact | Balazsi Gallery",
};

type ContactLinkProps = {
  emailHref: string;
  email: string;
  title: string;
  name?: string;
};

type ContactInfoProps = {
  title: string;
  children: React.ReactNode;
};

const ContactInfo = ({ title, children }: ContactInfoProps) => {
  return (
    <div className={styles.contactInfoInnerContainer}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

const ContactLink = ({ emailHref, email, title, name }: ContactLinkProps) => {
  return (
    <div className={styles.contactLinksInnerContainer}>
      <h2>{title}</h2>
      {name && <p style={{ fontWeight: 900 }}>{name}</p>}
      <a href={emailHref}>{email}</a>
    </div>
  );
};

export default function Contact() {
  return (
    <div className={styles.container}>
      <div className={styles.contentMapContainer}>
        <div className={styles.contentContainer}>
          <h1>Contact / Visit</h1>
          <div className={styles.contactInfoContainer}>
            <ContactInfo title="Address">
              <p>
                Carrer Nicolau de Pacs 25 <br /> 07006, Palma de Mallorca, Spain
              </p>
            </ContactInfo>
            <ContactInfo title="Opening Hours">
              <p>
                Mon to Fri <br /> 11.00 – 17.00
              </p>
            </ContactInfo>
          </div>
          <div className={styles.contactLinksContainer}>
            <ContactLink
              emailHref="mailto:info@balazsi.com"
              email="info@balazsi.com"
              title="General Inquiries"
            />
            <ContactLink
              emailHref="mailto:axel@balazsi.com"
              email="axel@balazsi.com"
              title="Founder"
              name="Axel Balazsi"
            />
            <ContactLink
              emailHref="mailto:nicolas@balazsi.com"
              email="nicolas@balazsi.com"
              title="Director"
              name="Nicolás Mirasso Vanoli"
            />
            <ContactLink
              emailHref="mailto:elena@balazsi.com"
              email="elena@balazsi.com"
              title="Press and Comunication"
              name="Elena Covas López"
            />
          </div>
        </div>
        <div className={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3075.32159125212!2d2.657651776565406!3d39.57490197158734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x129793ac9ddb3e87%3A0xc9b4c3d8d1d474c1!2sCarrer%20Nicolau%20de%20Pacs%2C%2025%2C%20Llevant%2C%2007006%20Palma%2C%20Illes%20Balears!5e0!3m2!1sen!2ses!4v1767558176540!5m2!1sen!2ses"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.formInnerContainer}>
          <h2>Contact Form</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
