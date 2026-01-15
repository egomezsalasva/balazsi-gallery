import NavLinkList from "./NavLinkList";
import styles from "./Header.module.css";

const HeaderNav = () => {
  return (
    <nav className={styles.navDesktop}>
      <NavLinkList />
    </nav>
  );
};

export default HeaderNav;
