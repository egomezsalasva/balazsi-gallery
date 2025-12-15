import { Metadata } from "next";
import Exhibition from "../components/Exhibition";
import {
  ExhibitionContentfulType,
  fetchExhibitions,
} from "../utils/fetchExhibitions";
import { getByStatus } from "@/utils/getByStatus";

export const metadata: Metadata = {
  title: "Exhibitions Upcoming | Balazsi Gallery",
  description: "Exhibitions Upcoming | Balazsi Gallery",
};

const ExhibitionsArchive = async () => {
  const exhibitions = await fetchExhibitions();
  const archiveExhibitionsList = getByStatus(exhibitions, "Archive");
  return (
    <div>
      {archiveExhibitionsList.map((exhibition: ExhibitionContentfulType) => (
        <Exhibition exhibition={exhibition} key={exhibition.url} />
      ))}
    </div>
  );
};

export default ExhibitionsArchive;
