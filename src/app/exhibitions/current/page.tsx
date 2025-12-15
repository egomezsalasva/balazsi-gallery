import { Metadata } from "next";
import { redirect } from "next/navigation";
import Exhibition from "../components/Exhibition";
import {
  ExhibitionContentfulType,
  fetchExhibitions,
} from "../utils/fetchExhibitions";
import { getByStatus } from "@/utils/getByStatus";

export const metadata: Metadata = {
  title: "Exhibitions Current | Balazsi Gallery",
  description: "Exhibitions Current | Balazsi Gallery",
};

const ExhibitionsCurrent = async () => {
  const exhibitions = await fetchExhibitions();
  const currentExhibitionsList = getByStatus(exhibitions, "Current");
  if (currentExhibitionsList.length === 0) {
    redirect("/exhibitions/archive");
  }
  return (
    <div>
      {currentExhibitionsList.map((exhibition: ExhibitionContentfulType) => (
        <Exhibition exhibition={exhibition} key={exhibition.url} />
      ))}
    </div>
  );
};

export default ExhibitionsCurrent;
