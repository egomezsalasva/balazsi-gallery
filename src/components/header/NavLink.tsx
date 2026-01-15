"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

type NavLinkProps = {
  href: string;
  additionalHref?: string;
  children: React.ReactNode;
};

const NavLink = ({ href, additionalHref, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href ||
    pathname.startsWith(href + "/") ||
    (additionalHref && pathname.startsWith(additionalHref + "/"));
  return (
    <Link href={href} className={isActive ? styles.activeNavLink : ""}>
      <span style={{ background: isActive ? "#000" : "transparent" }} />
      {children}
    </Link>
  );
};

export default NavLink;
