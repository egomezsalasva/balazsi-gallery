import { Metadata } from "next";
import styles from "./page.module.css";
import Event from "./components/Event";
import { EventContentfulType, fetchEvents } from "./utils/fetchEvents";

export const metadata: Metadata = {
  title: "Events | Balazsi Gallery",
  description: "Events | Balazsi Gallery",
};

export default async function Events() {
  const events = await fetchEvents();
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.eventTitle}>Events</h2>
      </div>
      <div className={styles.eventSectionContainer}>
        {events.map((event: EventContentfulType) => (
          <Event event={event} key={event.title} />
        ))}
      </div>
    </div>
  );
}
