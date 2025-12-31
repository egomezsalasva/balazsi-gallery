import { NewsPostContentfulType } from "./utils/fetchNewsPost";
import OneColSlideshow from "@/components/slideshows/OneColSlideshow";

type NewsAdditionalImagesProps = {
  additionalImages: NewsPostContentfulType["additionalImagesCollection"]["items"];
};

const NewsAdditionalImages = ({
  additionalImages,
}: NewsAdditionalImagesProps) => {
  if (additionalImages.length === 0) {
    return null;
  }
  return <OneColSlideshow additionalImages={additionalImages} />;
};

export default NewsAdditionalImages;
