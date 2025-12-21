import { WorkContentfulType } from "./utils/fetchExhibition";
import WorksSection from "@/components/sections/WorksSection";

type ExhibitionWorksProps = {
  works: WorkContentfulType[];
};

const ExhibitionWorks = ({ works }: ExhibitionWorksProps) => {
  return <WorksSection works={works} />;
};

export default ExhibitionWorks;
