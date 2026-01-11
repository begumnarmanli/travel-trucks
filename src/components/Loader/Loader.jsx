import styles from "./Loader.module.css";
import iconCamper from "../../assets/icons/icon-camper.svg";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.animationWrapper}>
        <img
          src={iconCamper}
          className={styles.camperLoader}
          alt="Loading..."
        />
        <div className={styles.road}></div>
      </div>
      <p className={styles.loaderText}>Loading...</p>
    </div>
  );
};

export default Loader;
