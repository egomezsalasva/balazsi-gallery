import { WorkContentfulType } from "./utils/fetchFair";
import WorksSection from "@/components/sections/WorksSection";

type FairWorksProps = {
  works: WorkContentfulType[];
};

const FairWorks = ({ works }: FairWorksProps) => {
  return <WorksSection works={works} />;
};

export default FairWorks;
