import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Balazsi Gallery",
  description: "About | Balazsi Gallery",
};

export default function About() {
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
      About
    </div>
  );
}
