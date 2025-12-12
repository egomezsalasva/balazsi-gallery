import { Metadata } from "next";
import Exhibition from "../components/Exhibition";
import {
  ExhibitionContentfulType,
  fetchExhibitions,
} from "../utils/fetchExhibitions";
import { getExhibitionsByStatus } from "@/utils/getExhibitionsByStatus";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Exhibitions Current | Balazsi Gallery",
  description: "Exhibitions Current | Balazsi Gallery",
};

const ExhibitionsCurrent = async () => {
  const exhibitions = await fetchExhibitions();
  const currentExhibitionsList = getExhibitionsByStatus(exhibitions, "Current");
  if (currentExhibitionsList.length === 0) {
    redirect("/exhibitions/archive");
  }
  return (
    <div>
      {currentExhibitionsList.map((exhibition: any) => (
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

export default ExhibitionsCurrent;
