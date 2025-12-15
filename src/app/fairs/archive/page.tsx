import { Metadata } from "next";
import Fair from "../components/Fair";
import { FairContentfulType, fetchFairs } from "../utils/fetchFairs";
import { getByStatus } from "@/utils/getByStatus";

export const metadata: Metadata = {
  title: "Fairs Archive | Balazsi Gallery",
  description: "Fairs Archive | Balazsi Gallery",
};

const FairsArchive = async () => {
  const fairs = await fetchFairs();
  const archiveFairs = getByStatus(fairs, "Archive");
  return (
    <div>
      {archiveFairs.map((fair: FairContentfulType) => (
        <Fair key={fair.title} fair={fair} />
      ))}
    </div>
  );
};

export default FairsArchive;
