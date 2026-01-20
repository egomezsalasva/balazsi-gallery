import OneColSlideshow from "@/components/slideshows/OneColSlideshow";
import { InstallationImageContentfulType } from "./utils/fetchExhibition";
// import OneColSlideshowWithSides from "@/components/slideshows/OneColSlideshowWithSides";

type ExhibitionInstallationProps = {
  images: InstallationImageContentfulType[];
};

const ExhibitionInstallation = ({ images }: ExhibitionInstallationProps) => {
  return <OneColSlideshow additionalImages={images} />;
};

export default ExhibitionInstallation;
