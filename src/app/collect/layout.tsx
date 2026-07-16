import styles from "./layout.module.css";

export default function CollectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div style={{ minHeight: "100lvh" }}>{children}</div>;
}
