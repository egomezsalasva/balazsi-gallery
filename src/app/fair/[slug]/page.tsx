import { notFound } from "next/navigation";
import { fetchFair } from "./utils/fetchFair";
import FairDetails from "./FairDetails";
import styles from "./page.module.css";
import FairWorks from "./FairWorks";
import FairInstallation from "./FairInstallation";
import SectionLineContainer from "@/components/sections/SectionLineContainer";

type PageProps = {
  params: { slug: string };
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const fair = await fetchFair(slug);
  if (!fair) {
    notFound();
  }
  return (
    <div className={styles.container}>
      <FairDetails fair={fair} />
      {fair.installationImagesCollection.items.length > 0 && (
        <SectionLineContainer>
          <FairInstallation images={fair.installationImagesCollection.items} />
        </SectionLineContainer>
      )}
      {fair.worksCollection.items.length > 0 && (
        <SectionLineContainer>
          <FairWorks works={fair.worksCollection.items} />
        </SectionLineContainer>
      )}
    </div>
  );
}
