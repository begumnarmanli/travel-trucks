import notFoundImage from "../../assets/notFound.jpg";
import styles from "./NotFoundPage.module.css";

const NotFoundFeedback = ({
  onReset,
  message = "Oops! We couldn't find any campers matching your filters. Try adjusting your search!",
}) => {
  return (
    <div className={styles.container}>
      <img
        src={notFoundImage}
        alt="Campers Not Found"
        className={styles.image}
      />
      <h2 className={styles.title}>Campers Not Found</h2>
      <p className={styles.message}>{message}</p>

      {onReset && (
        <button className={styles.backButton} onClick={onReset}>
          Go back to all campers
        </button>
      )}
    </div>
  );
};

export default NotFoundFeedback;
