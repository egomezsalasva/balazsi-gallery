import NewsPressItem from "../components/NewsPressItem";
import { fetchNewsPress } from "../utils/fetchPress";

export default async function PressPage() {
  const press = await fetchNewsPress();
  return (
    <div>
      {press.map((item) => (
        <NewsPressItem key={item.url} newsPressItem={item} />
      ))}
    </div>
  );
}
