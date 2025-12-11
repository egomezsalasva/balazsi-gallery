import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Balazsi Gallery",
  description: "Contact | Balazsi Gallery",
};

export default function Contact() {
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
      Contact
    </div>
  );
}
