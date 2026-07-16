import Link from "next/link";
import { Metadata } from "next";
import ClearCartOnSuccess from "../components/ClearCartOnSuccess";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Purchase complete | Balazsi Gallery",
};

export default function CollectSuccessPage() {
  return (
    <div className={styles.container}>
      <ClearCartOnSuccess />
      <h1>Thank you</h1>
      <p>Your purchase was successful.</p>
      <p>
        We will be in touch shortly regarding shipping and delivery details.
      </p>
      <Link href="/collect/pieces" className={styles.link}>
        Back to pieces
      </Link>
    </div>
  );
}
