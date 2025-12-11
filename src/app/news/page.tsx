import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News | Balazsi Gallery",
  description: "News | Balazsi Gallery",
};

export default function News() {
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
      News
    </div>
  );
}
