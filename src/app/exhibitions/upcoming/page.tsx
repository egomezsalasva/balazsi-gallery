import { Metadata } from "next";
import Exhibition from "../components/Exhibition";
import { getExhibitionsByStatus } from "@/utils/getExhibitionsByStatus";
import { redirect } from "next/navigation";
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
  const upcomingExhibitionsList = getExhibitionsByStatus(
    exhibitions,
    "Upcoming",
  );
  if (upcomingExhibitionsList.length === 0) {
    redirect("/exhibitions/current");
  }
  return (
    <div>
      {upcomingExhibitionsList.map((exhibition: any) => (
        <Exhibition
          key={exhibition.title}
          img={{
            src: exhibition.heroImage.url,
            alt: exhibition.heroImage.fileName,
          }}
          artist={
            exhibition.artistsCollection.items.length > 1
              ? "Group Show"
              : exhibition.artistsCollection.items[0].name
          }
          title={exhibition.title}
          startDate={exhibition.startDate}
          endDate={exhibition.endDate}
          description={exhibition.summaryText}
        />
      ))}
    </div>
  );
};

export default ExhibitionsUpcoming;
