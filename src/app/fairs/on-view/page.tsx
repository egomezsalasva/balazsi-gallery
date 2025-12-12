import { Metadata } from "next";
import Fair from "../components/Fair";

export const metadata: Metadata = {
  title: "Fairs On View / Upcoming | Balazsi Gallery",
  description: "Fairs On View / Upcoming | Balazsi Gallery",
};

const FairsOnViewUpcoming = () => {
  return (
    <div>
      <Fair
        img={{ src: "/gallery.jpg", alt: "Jack Burton" }}
        title="Art Cologne Palma"
        date="2026"
        description="Information will arrive shortly"
      />
    </div>
  );
};

export default FairsOnViewUpcoming;
