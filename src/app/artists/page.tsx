import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artists | Balazsi Gallery",
  description: "Artists | Balazsi Gallery",
};

export default function Artists() {
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
      Artists
    </div>
  );
}
