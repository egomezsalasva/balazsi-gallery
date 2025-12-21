import { InstallationImageContentfulType } from "./utils/fetchExhibition";
import OneColSlideshowWithSides from "@/components/slideshows/OneColSlideshowWithSides";

type ExhibitionInstallationProps = {
  images: InstallationImageContentfulType[];
};

const ExhibitionInstallation = ({ images }: ExhibitionInstallationProps) => {
  return <OneColSlideshowWithSides images={images} />;
};

export default ExhibitionInstallation;
