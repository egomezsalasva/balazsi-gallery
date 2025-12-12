import { Metadata } from "next";
import Exhibition from "../components/Exhibition";
import { fetchExhibitions } from "../utils/fetchExhibitions";
import { getExhibitionsByStatus } from "@/utils/getExhibitionsByStatus";

export const metadata: Metadata = {
  title: "Exhibitions Upcoming | Balazsi Gallery",
  description: "Exhibitions Upcoming | Balazsi Gallery",
};

const ExhibitionsArchive = async () => {
  const exhibitions = await fetchExhibitions();
  const archiveExhibitionsList = getExhibitionsByStatus(exhibitions, "Archive");
  return (
    <div>
      {archiveExhibitionsList.map((exhibition: any) => (
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

export default ExhibitionsArchive;
