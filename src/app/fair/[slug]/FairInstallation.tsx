import OneColSlideshow from "@/components/slideshows/OneColSlideshow";
import { InstallationImageContentfulType } from "./utils/fetchFair";
// import OneColSlideshowWithSides from "@/components/slideshows/OneColSlideshowWithSides";

type FairInstallationProps = {
  images: InstallationImageContentfulType[];
};

const FairInstallation = ({ images }: FairInstallationProps) => {
  return <OneColSlideshow additionalImages={images} />;
};

export default FairInstallation;
