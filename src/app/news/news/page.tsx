import NewsItem from "../components/NewsItem";
import { fetchNews } from "../utils/fetchNews";

export default async function NewsPage() {
  const news = await fetchNews();
  return (
    <div>
      {news.map((item) => (
        <NewsItem key={item.slug} newsItem={item} />
      ))}
    </div>
  );
}
