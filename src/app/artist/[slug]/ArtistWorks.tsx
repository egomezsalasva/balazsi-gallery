import { WorkForArtistContentfulType } from "./utils/fetchWorksForArtist";
import WorksSection from "@/components/sections/WorksSection";

type ArtistWorksProps = {
  works: WorkForArtistContentfulType[];
};

const ArtistWorks = ({ works }: ArtistWorksProps) => {
  return <WorksSection works={works} />;
};

export default ArtistWorks;
