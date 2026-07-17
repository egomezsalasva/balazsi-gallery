import styles from "./CollectPageLayout.module.css";
import NavLink from "@/components/header/NavLink";
import { fetchCollectPieces } from "../utils/fetchCollectPieces";

const CollectPageLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pieces, merch] = await Promise.all([
    fetchCollectPieces("Pieces"),
    fetchCollectPieces("Merch"),
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.collect}>{children}</div>
      <div className={styles.collectHeader}>
        {pieces.length > 0 && <NavLink href="/collect/pieces">Pieces</NavLink>}
        {merch.length > 0 && <NavLink href="/collect/merch">Merch</NavLink>}
      </div>
    </div>
  );
};

export default CollectPageLayout;
