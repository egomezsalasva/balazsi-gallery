import { Metadata } from "next";
import { redirect } from "next/navigation";
import Fair from "../components/Fair";
import { FairContentfulType } from "../utils/fetchFairs";
import { fetchCurrentAndUpcomingFairs } from "../utils/fetchCurrentAndUpcomingFairs";

export const metadata: Metadata = {
  title: "Fairs On View / Upcoming | Balazsi Gallery",
  description: "Fairs On View / Upcoming | Balazsi Gallery",
};

const FairsOnViewUpcoming = async () => {
  const currentAndUpcomingFairs = await fetchCurrentAndUpcomingFairs();
  if (currentAndUpcomingFairs.length === 0) {
    redirect("/fairs/archive");
  }
  return (
    <div>
      {currentAndUpcomingFairs.map((fair: FairContentfulType) => (
        <Fair key={fair.slug} fair={fair} />
      ))}
    </div>
  );
};

export default FairsOnViewUpcoming;
