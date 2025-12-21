import { NewsForArtistContentfulType } from "./utils/fetchNewsForArtist";
import ThreeColSlideshow from "@/components/slideshows/ThreeColSlideshow";

type ArtistNewsProps = {
  news: NewsForArtistContentfulType[];
};

const ArtistNews = ({ news }: ArtistNewsProps) => {
  return (
    <ThreeColSlideshow
      title="News"
      slideshowItems={news}
      urlPrefix="/news"
      btnLabel="View News +"
    />
  );
};

export default ArtistNews;
