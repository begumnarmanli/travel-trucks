import IconStar from "../../assets/icons/icon-star.svg?react";
import styles from "./ReviewItem.module.css";

const ReviewItem = ({ review }) => {
  const { reviewer_name, reviewer_rating, comment } = review;

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <IconStar
        key={i}
        className={i < reviewer_rating ? styles.starFilled : styles.starEmpty}
      />
    ));
  };

  return (
    <div className={styles.reviewWrapper}>
      <div className={styles.header}>
        <div className={styles.avatar}>{reviewer_name[0].toUpperCase()}</div>
        <div className={styles.info}>
          <p className={styles.name}>{reviewer_name}</p>
          <div className={styles.stars}>{renderStars()}</div>
        </div>
      </div>
      <p className={styles.comment}>{comment}</p>
    </div>
  );
};

export default ReviewItem;
