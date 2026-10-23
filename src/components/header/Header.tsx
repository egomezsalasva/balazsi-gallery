import Link from "next/link";
import Logo from "../Logo";
import HeaderNav from "./HeaderNav";
import MobileNav from "./MobileNav";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <>
      <header className={styles.container}>
        <Link href="/" aria-label="Balazsi Gallery home">
          <Logo className={styles.logo} aria-hidden />
        </Link>
        <HeaderNav />
        <MobileNav />
      </header>
    </>
  );
};

export default Header;
