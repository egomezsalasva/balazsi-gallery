import { Metadata } from "next";
import Exhibition from "../components/Exhibition";
import {
  ExhibitionContentfulType,
  fetchExhibitions,
} from "../utils/fetchExhibitions";
import { getByStatus } from "@/utils/getByStatus";

export const metadata: Metadata = {
  title: "Exhibitions Archive | Balazsi Gallery",
  description: "Exhibitions Archive | Balazsi Gallery",
};

const ExhibitionsArchive = async () => {
  const exhibitions = await fetchExhibitions();
  const archiveExhibitionsList = getByStatus(exhibitions, "Archive");
  return (
    <div>
      {archiveExhibitionsList.map((exhibition: ExhibitionContentfulType) => (
        <Exhibition exhibition={exhibition} key={exhibition.slug} />
      ))}
    </div>
  );
};

export default ExhibitionsArchive;
