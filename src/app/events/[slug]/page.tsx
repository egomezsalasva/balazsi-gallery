import { notFound } from "next/navigation";
import { fetchEvent } from "./utils/fetchEvent";
import EventDetails from "./EventDetails";
import styles from "./page.module.css";

type PageProps = {
  params: { slug: string };
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const event = await fetchEvent(slug);
  if (!event) {
    notFound();
  }
  return (
    <div className={styles.container}>
      <EventDetails event={event} />
    </div>
  );
}
