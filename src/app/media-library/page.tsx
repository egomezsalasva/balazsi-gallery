import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Library | Balazsi Gallery",
  description: "Media Library | Balazsi Gallery",
};

export default function MediaLibrary() {
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
      Media Library
    </div>
  );
}
