import Link from "next/link";
import { Metadata } from "next";
import { stripe } from "@/lib/stripe";
import ClearCartOnSuccess from "../components/ClearCartOnSuccess";
import { fetchCollectPieceById } from "../utils/fetchCollectPieceById";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Purchase Complete | Balazsi Gallery",
};

type CollectSuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function CollectSuccessPage({
  searchParams,
}: CollectSuccessPageProps) {
  const { session_id } = await searchParams;

  let artistSlug: string | undefined;

  if (session_id) {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const collectId = session.metadata?.collectIds?.split(",")[0];

    if (collectId) {
      const piece = await fetchCollectPieceById(collectId);
      artistSlug = piece?.artist?.slug;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <ClearCartOnSuccess />
        <h1>Thank you</h1>
        <p>Your purchase was successful.</p>
        <p>
          We will be in touch shortly regarding shipping and delivery details.
        </p>
        {artistSlug ? (
          <Link href={`/artist/${artistSlug}`} className={styles.link}>
            View More Pieces By The Artist
          </Link>
        ) : (
          <Link href="/collect/pieces" className={styles.link}>
            Collect More
          </Link>
        )}
      </div>
    </div>
  );
}
