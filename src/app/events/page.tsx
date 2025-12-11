import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | Balazsi Gallery",
  description: "Events | Balazsi Gallery",
};

export default function Events() {
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
      Events
    </div>
  );
}
