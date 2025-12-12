import { Metadata } from "next";
import Fair from "../components/Fair";

export const metadata: Metadata = {
  title: "Fairs Archive | Balazsi Gallery",
  description: "Fairs Archive | Balazsi Gallery",
};

const FairsArchive = () => {
  return (
    <div>
      <Fair
        img={{ src: "/gallery.jpg", alt: "Jack Burton" }}
        title="Can Art"
        date="25.06.2025 - 29.06.2025"
        description="For CAN Art Ibiza, Tube Gallery brings together a group of artists whose practices span painting, sculpture, installation, moving image, and text—but who are united by a shared commitment to probing the complexities of contemporary life through material, aesthetic, and conceptual experimentation."
      />
      <Fair
        img={{ src: "/gallery.jpg", alt: "Jack Burton" }}
        title="Art Düsseldorf Germany"
        date="11.04.2025 - 13.04.2025"
        description="Tube Gallery is delighted to announce our participation in the upcoming art fair, Art Düsseldorf, taking place from April 11 to April 15, 2025."
      />
      <Fair
        img={{ src: "/gallery.jpg", alt: "Jack Burton" }}
        title="SWAB Art Fair"
        date="03.10.2024 - 07.10.2024"
        description="Tube Gallery has been selected as one of the three galleries to participate in the prestigious SWAB Art Fair in Barcelona, showcasing emerging talent and contemporary art."
      />
    </div>
  );
};

export default FairsArchive;
