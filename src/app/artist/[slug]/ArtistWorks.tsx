import { WorkForArtistContentfulType } from "./utils/fetchWorksForArtist";
import WorksSection from "@/components/sections/WorksSection";

type ArtistWorksProps = {
  works: WorkForArtistContentfulType[];
};

const ArtistWorks = ({ works }: ArtistWorksProps) => {
  return (
    <div>
      <WorksSection works={works} />
    </div>
  );
};

export default ArtistWorks;
