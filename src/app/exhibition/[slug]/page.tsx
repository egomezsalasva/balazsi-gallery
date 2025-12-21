import { notFound } from "next/navigation";
import { fetchExhibition } from "./utils/fetchExhibition";
import ExhibitionDetails from "./ExhibitionDetails";
import ExhibitionInstallation from "./ExhibitionInstallation";
import ExhibitionWorks from "./ExhibitionWorks";
import styles from "./page.module.css";

type PageProps = {
  params: { slug: string };
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const exhibition = await fetchExhibition(slug);
  if (!exhibition) {
    notFound();
  }
  return (
    <div className={styles.container}>
      <ExhibitionDetails exhibition={exhibition} />
      {exhibition.installationImagesCollection.items.length > 0 && (
        <ExhibitionInstallation
          images={exhibition.installationImagesCollection.items}
        />
      )}
      {exhibition.worksCollection.items.length > 0 && (
        <ExhibitionWorks works={exhibition.worksCollection.items} />
      )}
    </div>
  );
}
