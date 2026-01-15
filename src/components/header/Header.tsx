import Link from "next/link";
import Logo from "../Logo";
import HeaderNav from "./HeaderNav";
import MobileNav from "./MobileNav";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <>
      <header className={styles.container}>
        <Link href="/">
          <Logo className={styles.logo} />
        </Link>
        <HeaderNav />
        <MobileNav />
      </header>
    </>
  );
};

export default Header;
