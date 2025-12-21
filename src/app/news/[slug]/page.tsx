import { notFound } from "next/navigation";
import { fetchNewsPost } from "./utils/fetchNewsPost";
import NewsPostDetails from "./NewsPostDetails";
import styles from "./page.module.css";

type PageProps = {
  params: { slug: string };
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const newsPost = await fetchNewsPost(slug);
  if (!newsPost) {
    notFound();
  }
  return (
    <div className={styles.container}>
      <NewsPostDetails newsPost={newsPost} />
    </div>
  );
}
