import styles from "./CollectPageLayout.module.css";
import NavLink from "@/components/header/NavLink";
import { fetchCollectPieces } from "../utils/fetchCollectPieces";

const CollectPageLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pieces, books] = await Promise.all([
    fetchCollectPieces("Pieces"),
    fetchCollectPieces("Books"),
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.collect}>{children}</div>
      <div className={styles.collectHeader}>
        {pieces.length > 0 && <NavLink href="/collect/pieces">Pieces</NavLink>}
        {books.length > 0 && <NavLink href="/collect/books">Books</NavLink>}
      </div>
    </div>
  );
};

export default CollectPageLayout;
