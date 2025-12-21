import { Metadata } from "next";
import { redirect } from "next/navigation";
import Exhibition from "../components/Exhibition";
import { getByStatus } from "@/utils/getByStatus";
import {
  ExhibitionContentfulType,
  fetchExhibitions,
} from "../utils/fetchExhibitions";

export const metadata: Metadata = {
  title: "Exhibitions Upcoming | Balazsi Gallery",
  description: "Exhibitions Upcoming | Balazsi Gallery",
};

const ExhibitionsUpcoming = async () => {
  const exhibitions = await fetchExhibitions();
  const upcomingExhibitionsList = getByStatus(exhibitions, "Upcoming");
  if (upcomingExhibitionsList.length === 0) {
    redirect("/exhibitions/current");
  }

  return (
    <div>
      {upcomingExhibitionsList.map((exhibition: ExhibitionContentfulType) => (
        <Exhibition exhibition={exhibition} key={exhibition.slug} />
      ))}
    </div>
  );
};

export default ExhibitionsUpcoming;
