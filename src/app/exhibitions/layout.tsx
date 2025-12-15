import { fetchContentfulData } from "@/utils/fetchContentfulData";
import styles from "./layout.module.css";
import { NavLink } from "@/components/Header";
import { getByStatus } from "@/utils/getByStatus";

const EXHIBITIONS_QUERY = `
query{
  exhibitionCollection{
    items{
      startDate
      endDate
    }
  }
}
`;

const fetchExhibitions = async () => {
  const data = await fetchContentfulData(EXHIBITIONS_QUERY);
  return data.data.exhibitionCollection.items;
};

const ExhibitionsLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const exhibitions = await fetchExhibitions();
  const currentExhibitionsList = getByStatus(exhibitions, "Current");
  const upcomingExhibitionsList = getByStatus(exhibitions, "Upcoming");
  return (
    <div className={styles.container}>
      <div className={styles.exhibitions}>{children}</div>
      <div className={styles.exhibitionsHeader}>
        {currentExhibitionsList.length > 0 && (
          <NavLink href="/exhibitions/current">Current</NavLink>
        )}
        {upcomingExhibitionsList.length > 0 && (
          <NavLink href="/exhibitions/upcoming">Upcoming</NavLink>
        )}
        <NavLink href="/exhibitions/archive">Archive</NavLink>
      </div>
    </div>
  );
};

export default ExhibitionsLayout;
