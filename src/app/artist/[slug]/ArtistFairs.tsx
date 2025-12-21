import { FairForArtistContentfulType } from "./utils/fetchFairsForArtist";
import ThreeColSlideshow from "@/components/slideshows/ThreeColSlideshow";

type ArtistFairsProps = {
  fairs: FairForArtistContentfulType[];
};

const ArtistFairs = ({ fairs }: ArtistFairsProps) => {
  return (
    <ThreeColSlideshow
      title="Fairs"
      slideshowItems={fairs}
      urlPrefix="/fair"
      btnLabel="View Fair +"
    />
  );
};

export default ArtistFairs;
