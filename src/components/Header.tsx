"use client";
import Logo from "./Logo";
import styles from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={isActive ? styles.activeNavLink : ""}>
      <span className={isActive ? styles.activeDash : ""} />
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
        <NavLink href="/exhibitions">Exhibitions</NavLink>
        <NavLink href="/artists">Artists</NavLink>
        <NavLink href="/fairs">Fairs</NavLink>
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
