import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fairs | Balazsi Gallery",
  description: "Fairs | Balazsi Gallery",
};

export default function Fairs() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Fairs
    </div>
  );
}
