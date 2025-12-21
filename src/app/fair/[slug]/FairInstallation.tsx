import { InstallationImageContentfulType } from "./utils/fetchFair";
import OneColSlideshowWithSides from "@/components/slideshows/OneColSlideshowWithSides";

type FairInstallationProps = {
  images: InstallationImageContentfulType[];
};

const FairInstallation = ({ images }: FairInstallationProps) => {
  return <OneColSlideshowWithSides images={images} />;
};

export default FairInstallation;
