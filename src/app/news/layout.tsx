"use client";
import { usePathname } from "next/navigation";
import NavLink from "@/components/header/NavLink";
import styles from "./layout.module.css";

const LISTING_PATHS = new Set(["/news", "/news/news", "/news/press"]);

export default function NewsLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const innerPage = !LISTING_PATHS.has(pathname);

  if (innerPage) {
    return <>{children}</>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.news}>{children}</div>
      <div className={styles.newsHeader}>
        <NavLink href="/news/news">News</NavLink>
        <NavLink href="/news/press">Press</NavLink>
      </div>
    </div>
  );
}
