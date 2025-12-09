import styles from "./HomeHero.module.css";

const HomeHero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <div>Details</div>
        <div>Indicator</div>
      </div>
    </div>
  );
};

export default HomeHero;
