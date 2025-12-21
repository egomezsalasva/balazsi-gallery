import { Metadata } from "next";
import { redirect } from "next/navigation";
import Fair from "../components/Fair";
import { FairContentfulType, fetchFairs } from "../utils/fetchFairs";
import { getByStatus } from "@/utils/getByStatus";

export const metadata: Metadata = {
  title: "Fairs On View / Upcoming | Balazsi Gallery",
  description: "Fairs On View / Upcoming | Balazsi Gallery",
};

const FairsOnViewUpcoming = async () => {
  const fairs = await fetchFairs();
  const currentFairs = getByStatus(fairs, "Current");
  const upcomingFairs = getByStatus(fairs, "Upcoming");
  const currentAndUpcomingFairs = [...currentFairs, ...upcomingFairs];
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
