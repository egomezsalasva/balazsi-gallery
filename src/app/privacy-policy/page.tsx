import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Balazsi Gallery",
  description: "Privacy Policy | Balazsi Gallery",
};

export default async function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <h1>Privacy Policy</h1>
      <p>
        In compliance with the provisions of General Data Protection Regulation
        2016/679 (hereinafter, &quot;GDPR&quot;), as well as any applicable
        national law, we inform you of the following:
      </p>
      <section>
        <h2>
          1. Responsible party and purposes of processing your personal data
        </h2>
        <p>
          Your personal data will be processed by COMITNET SPAIN S.L, whose CIF
          is B57112088 and tax address C/ San Magi, 4, 07013 Palma (Illes
          Balears) (hereinafter, the &quot;Company&quot;), for the following
          purposes:
        </p>
        <ol type="a">
          <li>
            Guarantee proper management of our commercial relationship with you
            (in response to your queries and requests regarding the products and
            services we offer).
          </li>
          <li>
            Ensure correct accounting, fiscal and administrative management
            derived from the contractual relationship between both parties.
          </li>
          <li>
            Use your personal data to improve the products and services we
            offer, and to facilitate the sending of commercial communications by
            electronic means that may be of interest to you.
          </li>
        </ol>
      </section>
      <section>
        <h2>2. Legitimation of the processing of your personal data</h2>
        <p>
          In the case of being clients, the legal basis for purposes (a) and (b)
          is the execution of a contract consisting of guaranteeing correct
          management of our commercial and contractual relationship with you.
        </p>
        <p>
          For clients and potential clients, the legal basis for purpose (c) is
          based on the consent that we will request together with each form
          where we collect your data.
        </p>
      </section>
      <section>
        <h2>3. Period of conservation of your personal data</h2>
        <p>
          If you are a client, your data will be kept as long as the contractual
          relationship continues in force, and once it is finished, for the time
          necessary to comply with legal obligations.
        </p>
        <p>
          In the case of being a potential customer, the data will be kept as
          long as you do not oppose the treatment, up to a maximum of 5 years.
        </p>
      </section>
      <section>
        <h2>4. Recipients of your personal data</h2>
        <p>
          We inform you that your personal data will not be transferred to any
          third party, except to those third parties whose intervention is
          necessary for the correct management of our commercial relationship.
        </p>
        <p>
          In particular, we inform you that your data may be transferred, if
          required, to public bodies and authorities (administrative or
          judicial) in those cases in which a legal regulation so establishes.
        </p>
      </section>
      <section>
        <h2>
          5. Rights that you can exercise regarding the processing of your
          personal data
        </h2>
        <p>
          We inform you that you have the right to access your personal data,
          request the rectification of inaccurate data or even its deletion.
        </p>
        <p>
          In certain circumstances, you can request the limitation of the
          treatment, the portability of the data, as well as oppose the
          processing of your data.
        </p>
        <p>
          You can exercise your rights through the email address{" "}
          <a href="mailto:info@balazsi.com">info@balazsi.com</a> or by written
          communication addressed to the company at the address specified in
          section 1 of this policy.
        </p>
      </section>
    </div>
  );
}
