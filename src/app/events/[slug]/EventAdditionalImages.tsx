import { EventContentfulType } from "./utils/fetchEvent";
import OneColSlideshow from "@/components/slideshows/OneColSlideshow";

type EventAdditionalImagesProps = {
  additionalImages: EventContentfulType["additionalImagesCollection"]["items"];
};

const EventAdditionalImages = ({
  additionalImages,
}: EventAdditionalImagesProps) => {
  if (additionalImages.length === 0) {
    return null;
  }
  return <OneColSlideshow additionalImages={additionalImages} />;
};

export default EventAdditionalImages;
