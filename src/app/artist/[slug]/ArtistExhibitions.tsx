import { ExhibitionForArtistContentfulType } from "./utils/fetchExhibitionsForArtist";
import TwoColSlideshow from "@/components/slideshows/TwoColSlideshow";

type ArtistExhibitionsProps = {
  exhibitions: ExhibitionForArtistContentfulType[];
};

const ArtistExhibitions = ({ exhibitions }: ArtistExhibitionsProps) => {
  return <TwoColSlideshow slideshowItems={exhibitions} />;
};

export default ArtistExhibitions;
