import { notFound } from "next/navigation";
import { fetchExhibition } from "./utils/fetchExhibition";
import ExhibitionDetails from "./ExhibitionDetails";
import ExhibitionInstallation from "./ExhibitionInstallation";
import ExhibitionWorks from "./ExhibitionWorks";
import SectionLineContainer from "@/components/sections/SectionLineContainer";
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
        <SectionLineContainer>
          <ExhibitionInstallation
            images={exhibition.installationImagesCollection.items}
          />
        </SectionLineContainer>
      )}
      {exhibition.worksCollection.items.length > 0 && (
        <SectionLineContainer>
          <ExhibitionWorks works={exhibition.worksCollection.items} />
        </SectionLineContainer>
      )}
    </div>
  );
}
