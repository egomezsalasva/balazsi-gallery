import { notFound } from "next/navigation";
import { fetchFair } from "./utils/fetchFair";
import FairDetails from "./FairDetails";
import styles from "./page.module.css";
import FairWorks from "./FairWorks";
import FairInstallation from "./FairInstallation";

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
        <FairInstallation images={fair.installationImagesCollection.items} />
      )}
      {fair.worksCollection.items.length > 0 && (
        <FairWorks works={fair.worksCollection.items} />
      )}
    </div>
  );
}
