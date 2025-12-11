import { Metadata } from "next";
import Exhibition from "../components/Exhibition";

export const metadata: Metadata = {
  title: "Exhibitions Current | Balazsi Gallery",
  description: "Exhibitions Current | Balazsi Gallery",
};

const ExhibitionsCurrent = () => {
  return (
    <div>
      <Exhibition
        img={{ src: "/gallery.jpg", alt: "Jack Burton" }}
        title="Solo Exhibition"
        artist="Jack Burton"
        date="20.09 -  22.09"
        description="Tube Gallery is pleased to take part in this year’s Nit de l’Art on September 20th, from 6 to 11pm. On view: a solo exhibition by Jack Burton, featuring new works that explore materiality and narrative through his distinctive visual language."
      />
    </div>
  );
};

export default ExhibitionsCurrent;
