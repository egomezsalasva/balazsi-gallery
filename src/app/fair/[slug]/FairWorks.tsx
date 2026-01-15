import WorksSection from "@/components/sections/WorksSection";
import { WorkContentfulType } from "./utils/fetchFair";

type FairWorksProps = {
  works: WorkContentfulType[];
};

const FairWorks = ({ works }: FairWorksProps) => {
  return <WorksSection works={works} />;
};

export default FairWorks;
