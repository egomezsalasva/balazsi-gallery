import { Metadata } from "next";
import Exhibition from "../components/Exhibition";

export const metadata: Metadata = {
  title: "Exhibitions Upcoming | Balazsi Gallery",
  description: "Exhibitions Upcoming | Balazsi Gallery",
};

const ExhibitionsUpcoming = () => {
  return (
    <div>
      <Exhibition
        img={{ src: "/gallery.jpg", alt: "Jack Burton" }}
        artist="Ahren Warner"
        title="Solo Exhibition"
        date="20.09 - 21.11"
        description="Tube Gallery is pleased to present a solo exhibition by Ahren Warner. Bringing together new and recent works, the exhibition highlights Warner’s distinctive interdisciplinary approach, combining photography, text, and video to explore themes of identity, intimacy, and mediated experience. Without adhering to a fixed narrative, Warner’s work invites reflection on how we navigate personal and collective realities in a visually saturated world. We invite you to discover this multifaceted and thought-provoking body of work at Tube Gallery."
      />
    </div>
  );
};

export default ExhibitionsUpcoming;
