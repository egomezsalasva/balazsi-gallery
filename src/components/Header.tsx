"use client";
import Logo from "./Logo";
import styles from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  additionalHref?: string;
  children: React.ReactNode;
};

export const NavLink = ({ href, additionalHref, children }: NavLinkProps) => {
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

const Header = () => {
  return (
    <header className={styles.container}>
      <Logo className={styles.logo} />
      <nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/exhibitions" additionalHref="/exhibition">
          Exhibitions
        </NavLink>
        <NavLink href="/artists" additionalHref="/artist">
          Artists
        </NavLink>
        <NavLink href="/fairs" additionalHref="/fair">
          Fairs
        </NavLink>
        <NavLink href="/news">News</NavLink>
        <NavLink href="/events">Events</NavLink>
        <NavLink href="/media-library">Media Library</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/contact">Contact</NavLink>
      </nav>
    </header>
  );
};

export default Header;
